import Styles from "@/assets/css/search.module.scss";
import CinemaItem from "@/components/Common/CinemaItem";
import { cinemaState, cinemasInfoInf } from "@/types/cinema";
import { SearchOutline } from "antd-mobile-icons";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const cinemaList = useSelector<cinemaState, Array<cinemasInfoInf>>(
    (state) => state.cinema.cinemaList
  );

  const cinemaFilterList = useMemo(() => {
    if (searchText) {
      let result = cinemaList.filter(
        (res) =>
          res.address.includes(searchText) || res.name.includes(searchText)
      );
      return result;
    } else {
      return cinemaList;
    }
  }, [searchText]);

  return (
    <>
      <div className={Styles["search-navbar"]}>
        <div>
          <SearchOutline fontSize={16}></SearchOutline>
          <input
            type="text"
            placeholder="请输入影城名称"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div onClick={() => navigate(-1)}>返回</div>
      </div>
      <div className={Styles["search-list-wrapper"]}>
        {cinemaFilterList.map((item, key) => {
          return (
            <CinemaItem
              key={key}
              item={item}
              onClick={() =>
                navigate(`/films/chinemasInfo/${item.cinemaId}/0/0`)
              }
            ></CinemaItem>
          );
        })}
      </div>
    </>
  );
}

export default Search;
