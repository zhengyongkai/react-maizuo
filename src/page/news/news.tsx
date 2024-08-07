import Navbar from '@/components/Layout/Navbar';
import { Dropdown, DropdownRef } from 'antd-mobile';

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getCinemasByCityId } from '@/api/movice';

import useLocation from '@/hook/location';
import type { cinemasInfoInf } from '@/types/cinema';
import CityItem from '@/components/Common/CityItem';

import Styles from '@/assets/css/cinemas.module.scss';
import CinemaItem from '@/components/Common/CinemaItem';
import Loading from '@/components/Common/PartLoading';
import CheckCell from '@/components/Common/CheckCell';
import { SearchOutlined } from '@ant-design/icons';

export default function NewsPage() {
  const location = useLocation();
  const [params, setParams] = useState({
    cityId: 0,
    ticketFlag: 1,
    ticketName: 'APP订票'
  });
  const menuRef = useRef<DropdownRef>(null);
  const [cinemaList, setCinemasList] = useState<{
    cinemas: Map<string, cinemasInfoInf[]>;
    cinemasList: cinemasInfoInf[];
  }>({
    cinemas: new Map(),
    cinemasList: []
  });
  const navigator = useNavigate();
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  location((locale) => {
    setParams({
      ...params,
      cityId: locale.cityId
    });
  });

  async function requestFn() {
    const defaultTitle = '全城';
    setLoading(true);
    const {
      data: { cinemas }
    } = await getCinemasByCityId({
      cityId: +params.cityId,
      ticketFlag: params.ticketFlag
    });
    const moviceMap = new Map<string, Array<cinemasInfoInf>>();
    moviceMap.set(defaultTitle, cinemas);
    cinemas
      .sort((pre, next) => pre.Distance - next.Distance)
      .forEach((element) => {
        const key = moviceMap.get(element.districtName);
        if (key) {
          moviceMap.set(element.districtName, [...key, element]);
        } else {
          moviceMap.set(element.districtName, [element]);
        }
      });
    setCinemasList({
      cinemas: moviceMap,
      cinemasList: [...moviceMap.values()][0]
    });
    setCityName(defaultTitle);
    setLoading(false);
  }

  useEffect(() => {
    if (params.cityId) {
      requestFn();
    }
  }, [params]);

  /**
   * @description: 城市选择
   * @param {string} res
   * @return {*}
   */
  function cityItemsChange(res: string) {
    const cinemas = cinemaList.cinemas.get(res) || [];
    setCinemasList({
      cinemas: cinemaList.cinemas,
      cinemasList: cinemas
    });
    setCityName(res);
    closeMenu();
  }

  /**
   * @description: 前台兑换还是APP订票
   * @param {number} key
   * @param {string} ticketName
   * @return {*}
   */
  function onTicketFlagchange(key: number, ticketName: string) {
    setParams({
      ...params,
      ticketFlag: key,
      ticketName
    });
    closeMenu();
  }

  function to(path: string) {
    navigator(path);
  }

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.close();
    }
  }

  return (
    <>
      <div>
        <div className={Styles['city-wrapper']}>
          <Navbar title="影院">
            <SearchOutlined size={96} onClick={() => to('/cinema/search')}></SearchOutlined>
          </Navbar>

          <Dropdown ref={menuRef}>
            <Dropdown.Item title={cityName} key="location">
              <div className={Styles['city-items']}>
                {[...cinemaList.cinemas.keys()].map((res, index) => {
                  return (
                    <CityItem
                      key={index}
                      title={res}
                      activeName={cityName}
                      onClick={() => cityItemsChange(res)}></CityItem>
                  );
                })}
              </div>
            </Dropdown.Item>
            <Dropdown.Item title={params.ticketName} key="type">
              <CheckCell
                title="APP订票"
                value={1}
                onClick={(e) => onTicketFlagchange(e, 'APP订票')}
                active={params.ticketFlag === 1}></CheckCell>
              <CheckCell
                title="前台兑换"
                value={2}
                onClick={(e) => onTicketFlagchange(e, '前台兑换')}
                active={params.ticketFlag === 2}></CheckCell>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <Loading loading={loading}>
          <div className={Styles['cinemas-wrapper']}>
            {cinemaList.cinemasList.map((item, key) => {
              return (
                <CinemaItem
                  item={item}
                  key={key}
                  onClick={() => to(`/films/chinemasInfo/${item.cinemaId}/0/0`)}></CinemaItem>
              );
            })}
          </div>
        </Loading>
      </div>
    </>
  );
}
