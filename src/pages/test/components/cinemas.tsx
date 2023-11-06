// import useFetch from "@/hook/fetch";
import useLocation from "@/hook/location";
import dayjs from "dayjs";
import {
  getCinemas,
  getCinemasList,
  getMoviceDetail,
} from "@/pages/api/movice";
import {
  cinemaListResponseImf,
  cinemaResponseImf,
  moviceImf,
} from "@/pages/types/movice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@/pages/css/cinemas.scss";

import NavTitle from "./navTitle";
import { Dropdown } from "antd-mobile";

export default function cinemas() {
  const { id = "" } = useParams();
  const location = useLocation();

  const [params, setParams] = useState({
    filmId: "",
    cityId: 0,
    cinemaIds: "",
  });

  const [film, setFilm] = useState<moviceImf>({
    filmId: 0,
    name: "",
    category: "",
    synopsis: "",
    poster: "",
    grade: "",
    actors: [],
    runtime: 0,
    nation: "",
  });

  const [cinema, setCinemas] = useState<cinemaResponseImf>({
    cinemaExtendList: [],
    showCinemas: [],
  });

  const [cinemaList, setCinemasList] = useState<cinemaListResponseImf>({
    cinemas: [],
  });

  location((locale) => {
    setParams({
      filmId: id,
      cityId: 110100,
      cinemaIds: "",
    });
  });
  useEffect(() => {
    async function fn() {
      const {
        data: { film },
      } = await getMoviceDetail({ filmId: id });
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
      setCinemas({
        cinemaExtendList,
        showCinemas: showCinemas,
      });
    }
    if (params.filmId) {
      getList();
    }
  }, [params]);

  useEffect(() => {
    async function fn() {
      const {} = await getCinemasList({});
    }
    if (cinema.showCinemas && cinema.showCinemas.length) {
    }
  }, [cinema]);

  return (
    <>
      <NavTitle title={film.name} back={true} />
      <div>
        <div className="cinemas-dates  inner-scroll">
          {cinema.showCinemas.map((item, index) => {
            return (
              <div>
                <span>{dayjs.unix(item.showDate).format("YYYY-MM-DD")}</span>
              </div>
            );
          })}
        </div>
        <Dropdown>
          <Dropdown.Item key="location" title="全城">
            <div>3123</div>
          </Dropdown.Item>
          <Dropdown.Item key="recent" title="最近去过">
            <div>3123</div>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </>
  );
}
