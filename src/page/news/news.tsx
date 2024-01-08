import Navbar from '@/components/Layout/Navbar';
import { Dropdown, DropdownRef } from 'antd-mobile';

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getCinemasByCityId } from '@/api/movice';

import useLocation from '@/hook/location';
import type { chinemaDetailImf } from '@/types/movice';
import CityItem from '@/components/Common/cityItem';

import Styles from '@/assets/css/cinemas.module.scss';
import CinemaItem from '@/components/Common/cinemaItem';
import Loading from '@/components/Common/partLoading';
import CheckCell from '@/components/Common/checkCell';

export default function newsPage() {
  const location = useLocation();
  const [params, setParams] = useState({
    cityId: 0,
    ticketFlag: 1,
    ticketName: 'APP订票',
  });
  const menuRef = useRef<DropdownRef>(null);
  const [cinemaList, setCinemasList] = useState<{
    cinemas: Map<string, chinemaDetailImf[]>;
    cinemasList: chinemaDetailImf[];
  }>({
    cinemas: new Map(),
    cinemasList: [],
  });
  const navigator = useNavigate();
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  location((locale) => {
    setParams({
      ...params,
      cityId: locale.cityId,
    });
  });

  async function requestFn() {
    const defaultTitle = '全城';
    setLoading(true);
    const {
      data: { cinemas },
    } = await getCinemasByCityId({
      cityId: +params.cityId,
      ticketFlag: params.ticketFlag,
    });
    const moviceMap = new Map<string, Array<chinemaDetailImf>>();
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
      cinemasList: [...moviceMap.values()][0],
    });
    // console.log(moviceMap);
    setCityName(defaultTitle);
    setLoading(false);
  }

  useEffect(() => {
    if (params.cityId) {
      requestFn();
    }
  }, [params]);

  function cityItemsChange(res: string) {
    const cinemas = cinemaList.cinemas.get(res) || [];

    setCinemasList({
      cinemas: cinemaList.cinemas,
      cinemasList: cinemas,
    });

    setCityName(res);
    closeMenu();
  }

  function onTicketFlagchange(key: number, ticketName: string) {
    setParams({
      ...params,
      ticketFlag: key,
      ticketName,
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
          <Navbar></Navbar>

          <Dropdown ref={menuRef}>
            <Dropdown.Item title={cityName} key="location">
              <div className={Styles['city-items']}>
                {[...cinemaList.cinemas.keys()].map((res, index) => {
                  return (
                    <CityItem
                      key={index}
                      title={res}
                      activeName={cityName}
                      onClick={() => cityItemsChange(res)}
                    ></CityItem>
                  );
                })}
              </div>
            </Dropdown.Item>
            <Dropdown.Item title={params.ticketName} key="type">
              <CheckCell
                title="APP订票"
                value={1}
                onClick={(e) => onTicketFlagchange(e, 'APP订票')}
                active={params.ticketFlag === 1}
              ></CheckCell>
              <CheckCell
                title="前台兑换"
                value={2}
                onClick={(e) => onTicketFlagchange(e, '前台兑换')}
                active={params.ticketFlag === 2}
              ></CheckCell>
              {/* <div
                onClick={() => onTicketFlagchange(1, "APP订票")}
                className={Styles["cinemas-cell"]}
              >
                <img src={CheckPng}></img> App订票
              </div>
              <div
                onClick={() => onTicketFlagchange(2, "前台兑换")}
                className={Styles["cinemas-cell"]}
              >
                前台兑换
              </div> */}
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
                  onClick={() => to(`/films/chinemasInfo/${item.cinemaId}/0/0`)}
                ></CinemaItem>
              );
            })}
          </div>
        </Loading>
      </div>
    </>
  );
}
