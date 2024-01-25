import Styles from "@/assets/css/location.module.scss";
import { useSelector, useDispatch } from "react-redux";

import Cookie from "@/utils/cookie";

import { IndexBar, List } from "antd-mobile";
import { useEffect, useState } from "react";
import { setLocale } from "@/store/common/location";

import type { cityStateInf } from "@/types/location";
import { useNavigate } from "react-router-dom";

interface cityInf {
  pinyin: string;
  name: string;
  cityId: number;
}

interface formatInf {
  title: string;
  name: string;
  cityId: number;
}

interface locationPageInf {
  back?: boolean;
}

function LocationPage(props: locationPageInf) {
  const { back = true } = props;

  const dispatch = useDispatch();

  const cityState = useSelector((state: cityStateInf) => state.location.locale);
  const locationList = useSelector(
    (state: cityStateInf) => state.location.locationList
  );
  const [city, setCity] = useState(cityState);
  const [hotList, setHotList] = useState<Array<formatInf>>([]);
  const [list, setList] = useState<
    Array<{ title: string; items: Array<formatInf> }>
  >([]);
  const navigator = useNavigate();

  useEffect(() => {
    const formatList = locationList.reduce(
      (
        pre: Map<string, { pinyin: string; list: Array<cityInf> }>,
        res: cityInf
      ) => {
        const chatOne = res.pinyin.charAt(0);
        const lists = pre.get(res.pinyin.charAt(0))?.list || [];

        pre.set(chatOne, {
          pinyin: res.pinyin,
          list: [
            ...lists,
            { pinyin: res.pinyin, name: res.name, cityId: res.cityId },
          ],
        });

        return pre;
      },
      new Map()
    );
    const result: Array<{ title: string; items: Array<formatInf> }> = [
      ...formatList.entries(),
    ]
      .map((res) => {
        return {
          title: res[0].toLocaleUpperCase(),
          items: res[1].list,
        };
      })
      .sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    setList(result);
    setHotList(locationList.filter((res) => res.isHot === 1));
  }, [locationList]);

  useEffect(() => {
    setCity(cityState);
  }, [cityState]);

  /**
   * @description: 选取城市 并且写到 cookie
   * @param {formatInf} item
   * @return {*}
   */
  function onCityClick(item: formatInf) {
    if (!item.cityId) {
      return false;
    }
    dispatch(setLocale(item));
    Cookie.setCookie("cityId", item.cityId);
    Cookie.setCookie("name", item.name);
    back && navigator(-1);
  }

  return (
    <div className={Styles["city-location-wrapper"]}>
      <div className={Styles["city-location"]}>当前城市 - {city.name} </div>
      <div className={Styles["city-recommend"]}>
        <div className={Styles["city-title"]}>GPS定位你所在的城市</div>
        <div className={Styles["city-gps"]}>
          <div
            className={Styles["city-tab"]}
            onClick={() =>
              onCityClick({
                cityId: city.cityId,
                name: city.name,
                title: city.name,
              })
            }
          >
            {city.name ? city.name : "定位失败"}
          </div>
        </div>
        <div className={Styles["city-title"]}>热门城市</div>
        <div className={Styles["city-tabs"]}>
          {hotList.map((item, index) => {
            return (
              <div
                className={Styles["city-tab"]}
                key={index}
                onClick={() => onCityClick(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className={Styles["city-list"]}>
        <IndexBar>
          {list.map((group) => {
            const { title, items } = group;
            return (
              <IndexBar.Panel index={title} title={title} key={title}>
                <List>
                  {items.map((item, index) => {
                    return (
                      <List.Item key={index} onClick={() => onCityClick(item)}>
                        {item.name}
                      </List.Item>
                    );
                  })}
                </List>
              </IndexBar.Panel>
            );
          })}
        </IndexBar>
      </div>
    </div>
  );
}

export default LocationPage;
