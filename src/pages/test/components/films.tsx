import { memo, useEffect, useRef, useState } from 'react';
import { getMoviceDetail } from '@/pages/api/movice';
import { useParams } from 'react-router-dom';

import '@/pages/css/films.scss';

import type { detailsResponseImf, detailsImf } from '@/pages/types/movice';
import moreImg from '@/assets/img/more.png';

import dayjs from 'dayjs';

function FilmPage() {
  const { id } = useParams();

  const [details, setDetails] = useState<detailsImf>();
  const synopsisRef = useRef(null);
  const synopsisHeight = useRef(0);

  async function getDetails() {
    const {
      data: { film },
    } = (await getMoviceDetail({ filmId: id })) as detailsResponseImf;

    setDetails(film);
  }

  useEffect(() => {
    getDetails();
    if (synopsisRef.current) {
      let { height } = synopsisRef.current?.getBoundingClientRect();
      synopsisHeight.current = height;
    }
  }, [synopsisRef.current]);

  const [more, setMore] = useState(false);
  const [heights, setHeight] = useState(38);

  function onMoreSynopsis() {
    setMore(!more);
  }

  useEffect(() => {
    setHeight(more ? synopsisHeight.current : 38);
  }, [more]);

  return (
    <>
      {details ? (
        <div>
          <div className="film-tabbar">{details.name}</div>
          <div className="film-lazy">
            <div className="film-poster">
              <img src={details.poster}></img>
            </div>
          </div>
          <div className="film-descrption">
            <div className="film-name">
              {details.name} <span>{details.filmType.name}</span>
            </div>
            <div className="film-grey">{details.category}</div>
            <div className="film-grey">
              {dayjs(details.premiereAt).format('YYYY-MM-DD')}上映
            </div>
            <div className="film-grey">
              {details.nation} | {details.runtime}
            </div>
            <div
              ref={synopsisRef}
              style={{
                position: 'absolute',
                top: '-30px',
                // marginLeft: -1000,
                opacity: 0,
              }}
            >
              {details.synopsis}
            </div>
            <div
              className={`film-synopsis ${
                more ? 'film-synopsis-more' : 'film-synopsis-short'
              }`}
              style={{ height: heights + 'px' }}
            >
              {details.synopsis}
            </div>
            <div
              className="film-toggle"
              style={more ? { transform: 'rotate(180deg)' } : {}}
            >
              <img src={moreImg} alt="" onClick={() => onMoreSynopsis()} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default memo(FilmPage);
