import Navbar from '@/components/Layout/Navbar';
import { Dropdown, DropdownRef } from 'antd-mobile';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getCinemasByCityId } from '@/api/movice';
import { useSelector } from 'react-redux';
import useLocation from '@/hook/location';
import { chinemaDetailImf } from '@/types/movice';
import CityItem from '@/components/Common/cityItem';

import Styles from '@/assets/css/cinemas.module.scss';
import CinemaItem from '@/components/Common/cinemaItem';
import Loading from '@/components/Common/partLoading';

export default function newsPage() {
  const location = useLocation();
  const [params, setParams] = useState(0);
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
    setParams(locale.cityId);
  });

  useEffect(() => {
    const defaultTitle = '全城';
    async function fn() {
      setLoading(true);
      const {
        data: { cinemas },
      } = await getCinemasByCityId({ cityId: +params });
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
    if (params) {
      fn();
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

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.close();
    }
  }

  function to(path: string) {
    navigator(path);
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
