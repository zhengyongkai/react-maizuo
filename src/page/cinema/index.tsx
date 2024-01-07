// import useFetch from "@/hook/fetch";
import useLocation from '@/hook/location';

import { getCinemas, getCinemasList, getMoviceDetail } from '@/api/movice';
import {
  cinemaListResponseImf,
  cinemaResponseImf,
  moviceImf,
  chinemaDetailImf,
  detailsImf,
} from '@/types/movice';
import { ExoticComponent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Styles from '@/assets/css/cinemas.module.scss';

import NavTitle from '@/components/Common/navTitle';
import { Dropdown, DropdownRef, List } from 'antd-mobile';
import Loading from '@/components/Common/partLoading';
import { useSelector } from 'react-redux';
import { tudeStateImf } from '@/types/location';
import { getBetweenDistance } from '@/utils/location';
import Tab from '@/components/Common/dateTab';
import MovieItems from '@/components/Common/movieItems';
import CinemaItem from '@/components/Common/cinemaItem';
import CityItem from '@/components/Common/cityItem';

interface sortTitleInf {
  title: string;
  key: number;
}

export default function cinemas() {
  const initSortTitle = {
    key: 1,
    title: '离我最近',
  };

  const menuRef = useRef<DropdownRef>(null);
  const locationAttr = useSelector(
    (state: tudeStateImf) => state.location.tude
  );
  const { id = '' } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('');
  const [date, setDate] = useState(0);
  const navigator = useNavigate();

  const [params, setParams] = useState({
    filmId: 0,
    cityId: 0,
    cinemaIds: '',
  });

  const [film, setFilm] = useState<detailsImf>({
    actors: [],
    category: '',
    director: '',
    filmId: 0,
    filmType: {
      name: '',
      value: 0,
    },
    isPresale: false,
    isSale: false,
    item: {
      name: '',
      type: 0,
    },
    language: '',
    name: '',
    nation: '',
    photos: [],
    poster: '',
    premiereAt: 0,
    runtime: 0,
    synopsis: '',
    timeType: 0,
    videoId: '',
    grade: 0,
    showDate: [],
  });

  const [cinema, setCinemas] = useState<cinemaResponseImf>({
    cinemaExtendList: [],
    showCinemas: [],
  });

  const [cinemaList, setCinemasList] = useState<{
    cinemas: Map<string, chinemaDetailImf[]>;
    cinemasList: chinemaDetailImf[];
  }>({
    cinemas: new Map(),
    cinemasList: [],
  });

  const [sortTitle, setSortTitle] = useState<sortTitleInf>(initSortTitle);

  location((locale) => {
    setParams({
      filmId: +id,
      cityId: locale.cityId,
      cinemaIds: '',
      // cityName: params.cityName,
    });
  });

  useEffect(() => {
    async function fn() {
      const {
        data: { film },
      } = await getMoviceDetail({ filmId: +id });
      setFilm(film);
    }
    fn();
  }, []);

  useEffect(() => {
    async function getList() {
      const {
        data: { cinemaExtendList, showCinemas },
      } = (await getCinemas(params)) as {
        data: cinemaResponseImf;
      };

      showCinemas.sort((a, b) => a.showDate - b.showDate);
      setCinemas({
        cinemaExtendList,
        showCinemas: showCinemas,
      });

      setDate(showCinemas[0].showDate);
    }
    if (params.filmId && params.cityId !== -1) {
      getList();
    }
  }, [params.filmId, params.cityId]);

  useEffect(() => {
    const defaultTitle = '全城';
    if (cinema.showCinemas.length) {
      setLoading(true);

      const cinemaIds = params.cinemaIds
        ? params.cinemaIds
        : cinema.showCinemas[0].cinemaList.join(',');
      async function fn() {
        const {
          data: { cinemas },
        } = await getCinemasList({
          cityId: params.cityId,
          cinemaIds,
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
        setCityName(defaultTitle);
        setLoading(false);
      }
      fn();
    }
  }, [cinema.showCinemas, params.cinemaIds, params.cityId]);

  function cityItemsChange(res: string) {
    const cinemas = cinemaList.cinemas.get(res) || [];

    setCinemasList({
      cinemas: cinemaList.cinemas,
      cinemasList: cinemas,
    });

    setCityName(res);
    closeMenu();
  }

  function to(path: string) {
    navigator(path);
  }

  function sortItems() {
    const sortItem = [
      {
        key: 1,
        title: '离我最近',
      },
      { key: 2, title: '价格最低' },
    ];

    return sortItem.map((res) => {
      return (
        <List.Item
          key={res.key}
          className={sortTitle.key === res.key ? 'cinemas-sort-active' : ''}
          arrow={false}
          onClick={() => onSortFn(res)}
        >
          {res.title}
        </List.Item>
      );
    });
  }

  function onSortFn(type: sortTitleInf) {
    let sortParams: 'Distance' | 'lowPrice' = 'Distance';
    switch (type.key) {
      case -1:
        break;
      case 1:
        sortParams = 'Distance';
        break;
      case 2:
        sortParams = 'lowPrice';
        break;
      default:
        break;
    }
    if (sortParams) {
      let result = cinemaList.cinemasList.sort((pre, next) => {
        return pre[sortParams] - next[sortParams];
      });
      setSortTitle(type);
      setCinemasList({
        cinemas: cinemaList.cinemas,
        cinemasList: result,
      });
      closeMenu();
    }
  }

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.close();
    }
  }

  return (
    <>
      <NavTitle title={film.name} back={true} />
      <div style={{ paddingTop: 48 }}>
        <Tab
          tabList={cinema.showCinemas}
          dataKey="showDate"
          defaultActive={0}
          onChange={(key, item) => {
            setParams({
              ...params,
              cinemaIds: item.cinemaList.join(','),
            });
            setDate(item.showDate);
          }}
        />
        <Dropdown ref={menuRef}>
          <Dropdown.Item key="location" title={cityName}>
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
          <Dropdown.Item key="recent" title={sortTitle.title}>
            <List>{sortItems()}</List>
          </Dropdown.Item>
        </Dropdown>

        <Loading loading={loading}>
          <div className={Styles['cinemas-items']}>
            {cinemaList.cinemasList.map((item, index) => {
              return (
                <CinemaItem
                  key={index}
                  item={item}
                  onClick={() =>
                    to(
                      `/films/chinemasInfo/${item.cinemaId}/${film.filmId}/${date}`
                    )
                  }
                ></CinemaItem>
              );
            })}
          </div>
        </Loading>
      </div>
    </>
  );
}
