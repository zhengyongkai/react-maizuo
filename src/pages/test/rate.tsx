/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import useEcharts from "@/hook/echarts";
import useFetch from "@/hook/fetch";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMoviceDetail } from "../api/movice";
import { BaseBarSeries } from "../types/echarts";
import { detailsResponseImf } from "../types/movice";
import BarEcharts from "./components/echarts/barEcharts";
import Navbar from "./components/Navbar";
import NavTitle from "./components/navTitle";
import dayjs from "dayjs";

import "@/pages/css/rate.scss";
import PartLoading from "./components/partLoading";
import LoadingWrap from "./components/loading";

const RatePage = () => {
  const detailsInitData = {
    film: {
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
    },
  };

  const ref = useRef<{
    setData: (series: BaseBarSeries[], yData: unknown[]) => void;
  }>(null);

  const { cinemaId = "" } = useParams();

  const [{ film }, loading] = useFetch<detailsResponseImf>(
    () => getMoviceDetail({ filmId: cinemaId }),
    detailsInitData,
    [cinemaId],
    () => {
      const data = [
        {
          type: "bar",
          data: [0, 5, 200, 500, 2545],
        },
      ];
      ref.current?.setData(data, ["1", "2", "3", "4", "5"]);
    }
  );
  return (
    <>
      <NavTitle back title={film.name}></NavTitle>

      <LoadingWrap loading={loading}>
        <div className="films-wrapper">
          <div className="films-info">
            <div className="film-descrption">
              <div className="film-name ">
                <div>
                  <div className="text-ellipsis"> {film.name}</div>
                  <span>{film.filmType.name}</span>
                </div>

                <div
                  className="film-grade"
                  style={!film.grade ? { display: "none" } : {}}
                >
                  {film.grade} <span>分</span>
                </div>
              </div>
              <div className="film-grey">
                {film.category.split("|").join(" | ")}
              </div>
              <div className="film-grey">
                {dayjs.unix(film.premiereAt).format("YYYY-MM-DD")}上映
              </div>
              <div className="film-grey">
                {film.nation} | {film.runtime} 分钟
              </div>
            </div>
            <div>
              <img src={film.poster} alt="" />
            </div>
          </div>
          <div className="film-rate">
            <div className="film-title">总体评分</div>
            <BarEcharts ref={ref} height={200}></BarEcharts>
          </div>
          <div className="film-rate">
            <div className="film-title">总体评价</div>
          </div>
        </div>
      </LoadingWrap>
    </>
  );
};

export default RatePage;
