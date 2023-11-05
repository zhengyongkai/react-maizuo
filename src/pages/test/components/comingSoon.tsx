import { memo, useEffect, useState } from 'react';
import { getMoviceData, getMoviceComingData } from '@/pages/api/movice';
import { moviceImf } from '@/pages/types/movice';
import '@/pages/css/movice.scss';
import { useParams } from 'react-router-dom';
import Loading from './loading';
import { useSelector } from 'react-redux';

import type { cityStateImf } from '@/types/location';
import { InfiniteScroll } from 'antd-mobile';
import MovieItems from './movieItems';

function comingSoon() {
  const [movice, setMovice] = useState<Array<moviceImf>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const cityId = useSelector(
    (state: cityStateImf) => state.location.locale.cityId
  );
  const [page, setPage] = useState({
    pageNum: 0,
    pageSize: 10,
    total: 0,
    cityId,
  });

  async function getMoviceDataList() {
    const api = getMoviceComingData;
    const {
      data: { films, total },
    } = await api(page);
    if (films.length === 0) {
      return setHasMore(false);
    }
    const list = movice.concat(films);
    setMovice(list);
    setPage({
      ...page,
      total,
    });
  }

  async function loadMore() {
    setPage({
      ...page,
      pageNum: (page.pageNum += 1),
    });
    console.log(page);
    await getMoviceDataList();
  }

  return (
    <>
      <div>
        {movice.map((item, index) => {
          return <MovieItems item={item} key={index} />;
        })}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
      </div>
    </>
  );
}

export default memo(comingSoon);
