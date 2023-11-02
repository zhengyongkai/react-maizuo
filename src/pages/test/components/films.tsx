import { memo, useEffect, useState } from 'react';
import { getMoviceDetail } from '@/pages/api/movice';
import { useParams } from 'react-router-dom';

import '@/pages/css/films.scss';

import type { detailsResponseImf, detailsImf } from '@/pages/types/movice';

function FilmPage() {
  const { id } = useParams();

  const [details, setDetails] = useState<detailsImf>();

  async function getDetails() {
    const {
      data: { film },
    } = (await getMoviceDetail({ filmId: id })) as detailsResponseImf;

    setDetails(film);
  }

  useEffect(() => {
    getDetails();
  }, []);

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
            <div className="film-grey">{details.premiereAt}上映</div>
            <div className="film-grey">
              {details.nation} | {details.runtime}
            </div>
            <div className="film-synopsis">{details.synopsis}</div>
            <div className="film-toggle">dasd</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default memo(FilmPage);
