import { useEffect, useState } from 'react';
import { getDaysNameFn } from '@/utils/day';
import Styles from '@/assets/css/dateTab.module.scss';
import { combineCss } from '@/utils/css';

interface propsImf<T> {
  tabList: Array<T>;
  defaultActive?: number;
  dataKey?: string;

  onChange?: (index: number, item: T) => void;
}

export default function Tab<T>(props: propsImf<T>) {
  const { tabList, defaultActive, dataKey, onChange } = props;
  const [active, setActive] = useState(defaultActive);

  useEffect(() => {
    setActive(defaultActive);
  }, [defaultActive]);

  useEffect(() => {
    setActive(0);
  }, [tabList]);

  return (
    <div className={combineCss([Styles['cinemas-dates'], 'inner-scroll'])}>
      {tabList.map((item: any, index) => {
        return (
          <div
            className={index === active ? Styles['cinemas-dates-active'] : ''}
            key={index}
            onClick={() => {
              setActive(index);
              onChange && onChange(index, item);
            }}
          >
            {dataKey ? (
              <span>{getDaysNameFn(item[dataKey])}</span>
            ) : (
              <span>{getDaysNameFn(item)}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
