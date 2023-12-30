import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getQueryVariable } from '../utils';
import { queryOrder } from '../api/order';

export default function Orderquery() {
  const { search } = useLocation();
  useEffect(() => {
    const query = getQueryVariable(search);
    console.log(query.get('out_trade_no'));
    console.log(query.get('trade_no'));
    queryOrder({
      out_trade_no: query.get('out_trade_no'),
      trade_no: query.get('trade_no'),
    });
  }, []);
  return <></>;
}
