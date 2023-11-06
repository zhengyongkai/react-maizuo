import { DOMElement, memo, useEffect, useRef, useState } from "react";
import { getMoviceDetail } from "@/pages/api/movice";
import { useNavigate, useParams } from "react-router-dom";

import "@/pages/css/films.scss";

import type { detailsResponseImf, detailsImf } from "@/pages/types/movice";
import moreImg from "@/assets/img/more.png";
import backImg from "@/assets/img/back.png";
import Loading from "./loading";

import useSroll from "@/hook/scroll";
import useFetch from "@/hook/fetch";
// import usePath from '@/hook/back';

import dayjs from "dayjs";

function FilmPage() {
  const { id = "" } = useParams();

  // const [film, setfilm] = useState<filmImf>();
  const synopsisRef = useRef<HTMLDivElement>(null);
  const synopsisHeight = useRef(0);

  const [{ film }, loading] = useFetch(() =>
    getMoviceDetail({ filmId: id })
  ) as [detailsResponseImf, boolean];

  useSroll(scrollCallback);

  useEffect(() => {
    if (synopsisRef.current) {
      let { height } = synopsisRef.current?.getBoundingClientRect();
      synopsisHeight.current = height;
    }
  }, [synopsisRef.current]);

  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const [heights, setHeight] = useState(38);
  const [tabbarVisble, setTabbarVisble] = useState(false);

  function onMoreSynopsis() {
    setMore(!more);
  }

  useEffect(() => {
    setHeight(more ? synopsisHeight.current : 38);
  }, [more]);

  function scrollCallback() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop > 60) {
      setTabbarVisble(true);
    } else {
      setTabbarVisble(false);
    }
  }

  function showTabbar(film: detailsImf) {
    return (
      <div
        className="film-tabbar"
        style={tabbarVisble ? { backgroundColor: "#fff" } : {}}
      >
        <div>
          <img src={backImg} alt="" onClick={() => navigate(-1)} />
        </div>
        {tabbarVisble ? <div className="title">{film.name}</div> : undefined}
      </div>
    );
  }

  return (
    <>
      {!loading && film ? (
        <>
          <div>
            {showTabbar(film)}
            <div className="film-lazy">
              <div className="film-poster">
                <img src={film.poster}></img>
              </div>
            </div>
            <div className="film-descrption">
              <div className="film-name ">
                <div>
                  <div className="text-ellipsis"> {film.name}</div>{" "}
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
              <div
                ref={synopsisRef}
                style={{
                  position: "absolute",
                  top: "-30px",
                  // marginLeft: -1000,
                  opacity: 0,
                }}
              >
                {film.synopsis}
              </div>
              <div
                className={`film-synopsis ${
                  more ? "film-synopsis-more" : "film-synopsis-short"
                }`}
                style={{ height: heights + "px" }}
              >
                {film.synopsis}
              </div>
              <div
                className="film-toggle"
                style={more ? { transform: "rotate(180deg)" } : {}}
              >
                <img src={moreImg} alt="" onClick={() => onMoreSynopsis()} />
              </div>
            </div>
            <div className="film-anctors-list">
              <div className="film-title">演职列表</div>
              <div className="film-anctors inner-scroll">
                {film.actors.map((item, index) => {
                  return (
                    <div className="film-anctor" key={index}>
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
            <div className="film-photos-list">
              <div className="film-title">剧照</div>
              <div className="film-photo inner-scroll">
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
          <div className="film-footer">选座购票</div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default memo(FilmPage);
