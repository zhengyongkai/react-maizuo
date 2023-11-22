import "@/pages/css/location.scss";
import { useSelector, useDispatch } from "react-redux";

import Cookie from "@/pages/utils/cookie";

import { IndexBar, List } from "antd-mobile";
import { useEffect, useState } from "react";
import { setLocale } from "@/store/common/location";

import type { cityStateImf } from "@/types/location";
import { useNavigate } from "react-router-dom";

interface cityImf {
  pinyin: string;
  name: string;
  cityId: number;
}

interface formatImf {
  title: string;
  name: string;
  cityId: number;
}

function locationPage() {
  const dispatch = useDispatch();

  const cityState = useSelector((state: cityStateImf) => state.location.locale);
  const locationList = useSelector(
    (state: cityStateImf) => state.location.locationList
  );
  const [city, setCity] = useState(cityState);
  const [hotList, setHotList] = useState<Array<formatImf>>([]);
  const [list, setList] = useState<
    Array<{ title: string; items: Array<formatImf> }>
  >([]);
  const navigator = useNavigate();

  useEffect(() => {
    const formatList = locationList.reduce(
      (
        pre: Map<string, { pinyin: string; list: Array<cityImf> }>,
        res: cityImf
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
    const result: Array<{ title: string; items: Array<formatImf> }> = [
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

  function onCityClick(item: formatImf) {
    if (!item.cityId) {
      return false;
    }
    dispatch(setLocale(item));
    console.log(Cookie);
    Cookie.setCookie("cityId", item.cityId);
    Cookie.setCookie("name", item.name);
    navigator(-1);
  }
  return (
    <>
      <div className="city-location">当前城市 - {city.name} </div>
      <div className="city-recommend">
        <div className="city-title">GPS定位你所在的城市</div>
        <div className="city-gps">
          <div
            className="city-tab"
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
        <div className="city-title">热门城市</div>
        <div className="city-tabs">
          {hotList.map((item, index) => {
            return (
              <div
                className="city-tab"
                key={index}
                onClick={() => onCityClick(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="city-list">
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
    </>
  );
}

export default locationPage;
