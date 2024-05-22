/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import useEcharts from "@/hook/echarts";
import useFetch from "@/hook/fetch";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { BaseBarSeries } from "@/types/echarts";

import BarEcharts, { BaseBarChartInf } from "@/components/Echarts/BarEcharts";

import NavTitle from "@/components/Layout/NavTitle";
import dayjs from "dayjs";
import like from "@/assets/img/like.png";

// import domtoImg from 'dom-to-image';

import Styles from "@/assets/css/rate.module.scss";

import LoadingWrap from "@/components/Common/PartLoading";
import { BarSeriesOption } from "echarts";
import { InfiniteScroll, Rate } from "antd-mobile";

import {
  getMoviceDetail,
  getRateForChinema,
  getRateListForCinema,
} from "@/api/movice";
import type {
  detailsResponseInf,
  rateListDetailsPaginInf,
  rateListDetailsResponseImg,
} from "@/types/movice";

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

  const ref = useRef<BaseBarChartInf>(null);
  const warpperDom = useRef<HTMLDivElement>(null);
  const [esimateList, setEsimateList] = useState<rateListDetailsPaginInf>({
    pageNo: 1,
    pageSize: 10,
    list: [],
  });
  const [hasMore, setHasMore] = useState(true);

  const { filmId = "" } = useParams();

  const [{ film }, loading] = useFetch<detailsResponseInf>(
    getMoviceDetail,
    { filmId: +filmId },
    detailsInitData,
    [filmId],
    async () => {
      const data: Array<BaseBarSeries> = [
        {
          type: "bar",
          data: [],
        },
      ];
      let { data: rateList } = await getRateForChinema({
        filmId: +filmId,
      });
      data[0].data = rateList;
      ref.current?.setData(data, [1, 2, 3, 4, 5], {
        ...ref.current.baseBarOptions,
      });
      // loadMore();
    },
  );

  async function loadMore() {
    setEsimateList({
      ...esimateList,
      pageNo: esimateList.pageNo + 1,
      pageSize: esimateList.pageSize + 1,
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
  return (
    <>
      <NavTitle back title={film.name}></NavTitle>

      <LoadingWrap loading={loading}>
        <div className={Styles["films-wrapper"]} ref={warpperDom}>
          <div className={Styles["films-info"]}>
            <div className={Styles["film-descrption"]}>
              <div className={Styles["film-name"]}>
                <div>
                  <div className="truncate"> {film.name}</div>
                  <span>{film.filmType.name}</span>
                </div>

                <div
                  className={Styles["film-grade"]}
                  style={!film.grade ? { display: "none" } : {}}
                >
                  {film.grade} <span>分</span>
                </div>
              </div>
              <div className={Styles["film-grey"]}>
                {film.category.split("|").join(" | ")}
              </div>
              <div className={Styles["film-grey"]}>
                {dayjs.unix(film.premiereAt).format("YYYY-MM-DD")}上映
              </div>
              <div className={Styles["film-grey"]}>
                {film.nation} | {film.runtime} 分钟
              </div>
            </div>
            <div>
              <img src={film.poster} alt="" />
            </div>
          </div>
          <div className={Styles["film-rate"]}>
            <div className="film-title">总体评分</div>
            <BarEcharts ref={ref} height={200}></BarEcharts>
          </div>
          <div className={Styles["film-rate"]}>
            <div className="film-title">总体评价</div>
          </div>
          <div>
            {esimateList.list.map((item, key) => {
              return (
                <div key={key} className={Styles["esimate-wrapper"]}>
                  <div>
                    <img src={item.userInfo.headIcon} alt="" />
                  </div>
                  <div>
                    <div className={Styles["esimate-header"]}>
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
                      <div className={Styles["esimate-like"]}>
                        <img src={like} alt="" />
                        <span> {item.like}</span>
                      </div>
                    </div>

                    <div className={Styles["esimate-estimation"]}>
                      {item.estimation}
                    </div>
                  </div>
                </div>
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
