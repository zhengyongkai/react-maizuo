/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import useEcharts from "@/hook/echarts";
import useFetch from "@/hook/fetch";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMoviceDetail,
  getRateForChinema,
  getRateListForCinema,
} from "../api/movice";
import { BaseBarSeries } from "../types/echarts";
import {
  detailsResponseImf,
  rateListDetailsPaginImf,
  rateListDetailsResponseImg,
} from "../types/movice";
import BarEcharts, { BaseBarChartImf } from "./components/echarts/barEcharts";
import Navbar from "./components/Navbar";
import NavTitle from "./components/navTitle";
import dayjs from "dayjs";
import like from "@/assets/img/like.png";

// import domtoImg from 'dom-to-image';

import "@/pages/css/rate.scss";
import PartLoading from "./components/partLoading";
import LoadingWrap from "./components/loading";
import { BarSeriesOption } from "echarts";
import { InfiniteScroll, Rate } from "antd-mobile";

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

  const ref = useRef<BaseBarChartImf>(null);
  const warpperDom = useRef<HTMLDivElement>(null);
  const [esimateList, setEsimateList] = useState<rateListDetailsPaginImf>({
    pageNo: 1,
    pageSize: 10,
    list: [],
  });
  const [hasMore, setHasMore] = useState(true);

  const { filmId = "" } = useParams();

  const [{ film }, loading] = useFetch<detailsResponseImf>(
    () => getMoviceDetail({ filmId: filmId }),
    detailsInitData,
    [filmId],
    async () => {
      const data: Array<BaseBarSeries> = [
        {
          type: "bar",
          data: [0, 5, 200, 500, 2545],
        },
      ];

      let { data: rateList } = await getRateForChinema({ filmId: filmId });
      data[0].data = rateList;
      ref.current?.setData(data, [1, 2, 3, 4, 5], {
        ...ref.current.baseBarOptions,
        color: ["red"],
      });
      // loadMore();
    }
  );

  async function loadMore() {
    setEsimateList({
      ...esimateList,
      pageNo: Number(esimateList.pageNo) + 1,
      pageSize: Number(esimateList.pageSize) + 1,
    });
    await getData();
  }

  async function getData() {
    let {
      data: { list, pageSize, pageNo },
    } = await getRateListForCinema({
      pageNo: esimateList.pageNo,
      pageSize: esimateList.pageSize,
    });
    if (list.length === 0) {
      setHasMore(false);
    }
    setEsimateList({
      pageNo,
      pageSize,
      list: [...esimateList.list, ...list],
    });
  }

  // function jietu() {
  //   domtoImg.toPng(warpperDom.current as Node).then(function (dataUrl) {
  //     var img = new Image();
  //     img.src = dataUrl;
  //     document.body.appendChild(img);
  //   });
  // }
  return (
    <>
      <NavTitle back title={film.name}></NavTitle>

      <LoadingWrap loading={loading}>
        <div className="films-wrapper" ref={warpperDom}>
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
          <div>
            {esimateList.list.map((item, key) => {
              return (
                <>
                  <div key={key} className="esimate-wrapper">
                    <div>
                      <img src={item.userInfo.headIcon} alt="" />
                    </div>
                    <div>
                      <div className="esimate-header">
                        <div>
                          <div>{item.userInfo.nickName}</div>
                          <div>
                            <Rate
                              readOnly
                              value={item.rate}
                              count={5}
                              style={{
                                "--star-size": "10px",
                              }}
                            />
                            <span
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "#faaf00",
                              }}
                            >
                              {item.rate}分
                            </span>
                          </div>
                        </div>
                        <div className="esimate-like">
                          <img src={like} alt="" />
                          <span> {item.like}</span>
                        </div>
                      </div>

                      <div className="esimate-estimation">
                        {item.estimation}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
          </div>
        </div>
      </LoadingWrap>
    </>
  );
};

export default RatePage;
