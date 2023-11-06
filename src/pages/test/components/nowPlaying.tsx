import { memo, useEffect, useState } from "react";
import { getMoviceData } from "@/pages/api/movice";
import { detailsImf, moviceImf } from "@/pages/types/movice";
// import { cityStateImf } from '@/types/location';

import { useSelector } from "react-redux";

import type { cityStateImf } from "@/types/location";
import { InfiniteScroll } from "antd-mobile";

import useLocation from "@/hook/location";

import MovieItems from "./movieItems";

function nowPlaying() {
  const [movice, setMovice] = useState<Array<detailsImf>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const location = useLocation();
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
    const api = getMoviceData;
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

  location((locale) => {
    setPage({
      ...page,
      cityId: locale.cityId,
    });
  });

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
      <div style={{ backgroundColor: "#fff" }}>
        {movice.map((item, index) => {
          return <MovieItems item={item} type={1} key={index}></MovieItems>;
        })}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
      </div>
    </>
  );
}

export default memo(nowPlaying);
