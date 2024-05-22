// import useFetch from "@/hook/fetch";
import useLocation from "@/hook/location";

import { getCinemas, getCinemasList, getMoviceDetail } from "@/api/movice";
import type {
  cinemaListResponseInf,
  cinemaResponseInf,
  moviceInf,
  detailsInf,
} from "@/types/movice";
import { cinemasInfoInf } from "@/types/cinema";
import { ExoticComponent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Styles from "@/assets/css/cinemas.module.scss";

import NavTitle from "@/components/Layout/NavTitle";
import { Dropdown, DropdownRef, List } from "antd-mobile";
import Loading from "@/components/Common/PartLoading";
import Tab from "@/components/Common/DateTab";
import CinemaItem from "@/components/Common/CinemaItem";
import CityItem from "@/components/Common/CityItem";

export default function Cinemas() {
  const menuRef = useRef<DropdownRef>(null);

  const { id = "" } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(0);
  const navigator = useNavigate();

  const [params, setParams] = useState({
    filmId: 0,
    cityId: 0,
    cinemaIds: "",
  });

  const [film, setFilm] = useState<detailsInf>({
    actors: [],
    category: "",
    director: "",
    filmId: 0,
    filmType: {
      name: "",
      value: 0,
    },
    isPresale: false,
    isSale: false,
    item: {
      name: "",
      type: 0,
    },
    language: "",
    name: "",
    nation: "",
    photos: [],
    poster: "",
    premiereAt: 0,
    runtime: 0,
    synopsis: "",
    timeType: 0,
    videoId: "",
    grade: 0,
    showDate: [],
  });

  const [cinema, setCinemas] = useState<cinemaResponseInf>({
    cinemaExtendList: [],
    showCinemas: [],
  });

  const [cinemaList, setCinemasList] = useState<{
    cinemas: Map<string, cinemasInfoInf[]>;
    cinemasList: cinemasInfoInf[];
  }>({
    cinemas: new Map(),
    cinemasList: [],
  });

  location((locale) => {
    setParams({
      filmId: +id,
      cityId: locale.cityId,
      cinemaIds: "",
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
        data: cinemaResponseInf;
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
    const defaultTitle = "全城";
    if (cinema.showCinemas.length) {
      setLoading(true);

      const cinemaIds = params.cinemaIds
        ? params.cinemaIds
        : cinema.showCinemas[0].cinemaList.join(",");
      async function fn() {
        const {
          data: { cinemas },
        } = await getCinemasList({
          cityId: params.cityId,
          cinemaIds,
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
              cinemaIds: item.cinemaList.join(","),
            });
            setDate(item.showDate);
          }}
        />
        <Dropdown ref={menuRef}>
          <Dropdown.Item key="location" title={cityName}>
            <div className={Styles["city-items"]}>
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

        <Loading loading={loading}>
          <div className={Styles["cinemas-items"]}>
            {cinemaList.cinemasList.map((item, index) => {
              return (
                <CinemaItem
                  key={index}
                  item={item}
                  onClick={() =>
                    to(
                      `/films/chinemasInfo/${item.cinemaId}/${film.filmId}/${date}`,
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
