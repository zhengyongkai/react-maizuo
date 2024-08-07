import { DOMElement, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getMoviceDetail } from '@/api/movice';
import { useNavigate, useParams } from 'react-router-dom';

import Styles from '@/assets/css/films.module.scss';

import type { detailsResponseInf, detailsInf } from '@/types/movice';
import moreImg from '@/assets/img/more.png';
import backImg from '@/assets/img/back.png';

import useSroll from '@/hook/scroll';
import useFetch from '@/hook/fetch';
// import usePath from '@/hook/back';

import dayjs from 'dayjs';

import LoadingWrap from '@/components/Common/PartLoading';
import { cssCb } from '@/utils/css';
import { scrollTop } from '@/utils';

const detailsInitData: detailsResponseInf = {
  film: {
    actors: [],
    category: '',
    director: '',
    filmId: 0,
    filmType: {
      name: '',
      value: 0
    },
    isPresale: false,
    isSale: false,
    item: {
      name: '',
      type: 0
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
    showDate: []
  }
};

function FilmPage() {
  const { id = '' } = useParams();

  // const [film, setfilm] = useState<filmInf>();
  const synopsisRef = useRef<HTMLDivElement>(null);
  const synopsisHeight = useRef(0);

  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const [heights, setHeight] = useState(38);
  const [tabbarVisble, setTabbarVisble] = useState(false);

  const [{ film }, loading] = useFetch<detailsResponseInf>(
    getMoviceDetail,
    { filmId: +id },
    detailsInitData,
    [id]
  );

  useSroll(() => {
    if (scrollTop > 60) {
      setTabbarVisble(true);
    } else {
      setTabbarVisble(false);
    }
  });

  useEffect(() => {
    if (synopsisRef.current) {
      setTimeout(function () {
        synopsisHeight.current = synopsisRef.current?.getBoundingClientRect().height || 0;
      }, 500);
    }
  }, [synopsisRef.current]);

  useEffect(() => {
    setHeight(more ? synopsisHeight.current : 38);
  }, [more]);

  function onMoreSynopsis() {
    setMore(!more);
  }

  /**
   * @description: Tabbar 显影
   * @param {detailsInf} film 影院详情
   * @return {*}
   */
  function showTabbar(film: detailsInf) {
    return (
      <div
        h-48
        leading-48
        w-screen
        z-2
        text-17
        text-center
        fixed
        flex
        items-center
        transition="all duration-0.3s"
        className={Styles['film-tabbar']}
        style={tabbarVisble ? { backgroundColor: '#fff' } : {}}>
        <div>
          <img absolute w-36 t-6 l-5 src={backImg} alt="" onClick={() => navigate(-1)} />
        </div>
        {tabbarVisble ? (
          <div w-screen text-16 className={Styles['title']}>
            {film.name}
          </div>
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
            <div relative z-1 className={Styles['film-lazy']}>
              <div
                w-screen
                bg-white
                relative
                overflow-hidden
                t-0
                flex
                justify-center
                items-center
                h="56vw"
                className={Styles['film-poster']}>
                <img
                  w-screen
                  absolute
                  className="top-[50%]  translate-y--50%"
                  src={film.poster}></img>
              </div>
            </div>
            <div relative p-15 pt-12 bg-white className={Styles['film-descrption']}>
              <div
                text-black
                text-18
                h-24
                leading-24
                mr-7
                flex
                items-center
                className={Styles['film-name']}>
                <div flex flex-1 items-center overflow-hidden>
                  <div className="truncate"> {film.name}</div>
                  <span
                    ml-8
                    text-9
                    text-center
                    text-white
                    bg-slate-50
                    h-14
                    leading-14
                    px-2
                    rounded-2
                    inline-block
                    w-20>
                    {film.filmType.name}
                  </span>
                </div>

                <div
                  w-50
                  text-right
                  text-18
                  font-italic
                  text-yellow-50
                  className={Styles['film-grade']}
                  style={!film.grade ? { display: 'none' } : {}}>
                  {film.grade} <span text-10>分</span>
                </div>
              </div>
              <div className={Styles['film-grey']}>{film.category.split('|').join(' | ')}</div>
              <div className={Styles['film-grey']}>
                {dayjs.unix(film.premiereAt).format('YYYY-MM-DD')}上映
              </div>
              <div className={Styles['film-grey']}>
                {film.nation} | {film.runtime} 分钟
              </div>
              <div
                ref={synopsisRef}
                style={{
                  position: 'absolute',
                  top: '-30px',
                  opacity: 0
                }}>
                {film.synopsis}
              </div>
              <div
                overflow-hidden
                mt-12
                text-13
                text-grey-50
                transition="height duration-0.5s"
                className={`${Styles['film-synopsis']} ${
                  more ? Styles['film-synopsis-more'] : Styles['film-synopsis-short']
                }
                }`}
                style={{ height: heights + 'px' }}>
                {film.synopsis}
              </div>
              <div
                text-center
                block
                w-20
                mx-auto
                mt-10
                className={Styles['film-toggle']}
                style={more ? { transform: 'rotate(180deg)' } : {}}>
                <img src={moreImg} alt="" onClick={() => onMoreSynopsis()} />
              </div>
            </div>
            <div bg-white mt-8 className={Styles['film-anctors-list']}>
              <div className={Styles['film-title']}>演职列表</div>
              <div
                pl-15
                flex
                flex-nowrap
                overflow-x-auto
                className={cssCb([Styles['film-anctors'], 'inner-scroll'])}>
                {film.actors.map((item, index) => {
                  return (
                    <div mr-15 text-center className={Styles['film-anctor']} key={index}>
                      <div>
                        <img w-85 src={item.avatarAddress} alt="" />
                      </div>
                      <div>{item.name}</div>
                      <div text-10 text-grey-50>
                        {item.role}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={Styles['film-photos-list']}>
              <div className={Styles['film-title']}>剧照</div>
              <div className={cssCb([Styles['film-photo'], 'inner-scroll'])}>
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
          <div className={Styles['film-footer']}>
            <div className={Styles['choose']} onClick={() => navigate(`/films/cinemas/${id}`)}>
              选座购票
            </div>
            {film.grade ? (
              <div className={Styles['estimation']} onClick={() => navigate(`/rate/${id}`)}>
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
