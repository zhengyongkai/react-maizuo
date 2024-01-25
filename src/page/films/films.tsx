import {
  DOMElement,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getMoviceDetail } from "@/api/movice";
import { useNavigate, useParams } from "react-router-dom";

import Styles from "@/assets/css/films.module.scss";

import type { detailsResponseInf, detailsInf } from "@/types/movice";
import moreImg from "@/assets/img/more.png";
import backImg from "@/assets/img/back.png";

import useSroll from "@/hook/scroll";
import useFetch from "@/hook/fetch";
// import usePath from '@/hook/back';

import dayjs from "dayjs";

import LoadingWrap from "@/components/Common/PartLoading";
import { cssCb } from "@/utils/css";

const detailsInitData: detailsResponseInf = {
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

function FilmPage() {
  const { id = "" } = useParams();

  // const [film, setfilm] = useState<filmInf>();
  const synopsisRef = useRef<HTMLDivElement>(null);
  const synopsisHeight = useRef(0);

  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const [heights, setHeight] = useState(38);
  const [tabbarVisble, setTabbarVisble] = useState(false);

  const [{ film }, loading] = useFetch<detailsResponseInf>(
    () => getMoviceDetail({ filmId: +id }),
    detailsInitData,
    [id]
  );

  useSroll(() => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop > 60) {
      setTabbarVisble(true);
    } else {
      setTabbarVisble(false);
    }
  });

  useEffect(() => {
    if (synopsisRef.current) {
      setTimeout(function () {
        synopsisHeight.current =
          synopsisRef.current?.getBoundingClientRect().height || 0;
      }, 500);
    }
  }, [synopsisRef.current]);

  useEffect(() => {
    setHeight(more ? synopsisHeight.current : 38);
  }, [more]);

  function onMoreSynopsis() {
    setMore(!more);
  }

  function showTabbar(film: detailsInf) {
    return (
      <div
        className={Styles["film-tabbar"]}
        style={tabbarVisble ? { backgroundColor: "#fff" } : {}}
      >
        <div>
          <img src={backImg} alt="" onClick={() => navigate(-1)} />
        </div>
        {tabbarVisble ? (
          <div className={Styles["title"]}>{film.name}</div>
        ) : undefined}
      </div>
    );
  }
  return (
    <>
      <LoadingWrap loading={loading}>
        <>
          <div>
            {showTabbar(film)}
            <div className={Styles["film-lazy"]}>
              <div className={Styles["film-poster"]}>
                <img src={film.poster}></img>
              </div>
            </div>
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
              <div
                ref={synopsisRef}
                style={{
                  position: "absolute",
                  top: "-30px",
                  opacity: 0,
                }}
              >
                {film.synopsis}
              </div>
              <div
                className={`${Styles["film-synopsis"]} ${
                  more
                    ? Styles["film-synopsis-more"]
                    : Styles["film-synopsis-short"]
                }
                }`}
                style={{ height: heights + "px" }}
              >
                {film.synopsis}
              </div>
              <div
                className={Styles["film-toggle"]}
                style={more ? { transform: "rotate(180deg)" } : {}}
              >
                <img src={moreImg} alt="" onClick={() => onMoreSynopsis()} />
              </div>
            </div>
            <div className={Styles["film-anctors-list"]}>
              <div className={Styles["film-title"]}>演职列表</div>
              <div className={cssCb([Styles["film-anctors"], "inner-scroll"])}>
                {film.actors.map((item, index) => {
                  return (
                    <div className={Styles["film-anctor"]} key={index}>
                      <div>
                        <img src={item.avatarAddress} alt="" />
                      </div>
                      <div>{item.name}</div>
                      <div>{item.role}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={Styles["film-photos-list"]}>
              <div className={Styles["film-title"]}>剧照</div>
              <div className={cssCb([Styles["film-photo"], "inner-scroll"])}>
                {film.photos.map((item, index) => {
                  return (
                    <div key={index}>
                      <img src={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={Styles["film-footer"]}>
            <div
              className={Styles["choose"]}
              onClick={() => navigate(`/films/cinemas/${id}`)}
            >
              选座购票
            </div>
            {film.grade ? (
              <div
                className={Styles["estimation"]}
                onClick={() => navigate(`/rate/${id}`)}
              >
                评论
              </div>
            ) : null}
          </div>
        </>
      </LoadingWrap>
    </>
  );
}

export default memo(FilmPage);
