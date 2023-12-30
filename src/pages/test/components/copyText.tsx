import { Toast } from 'antd-mobile';
import { memo, useRef } from 'react';

interface propsInf {
  text: string;
  children: React.ReactElement;
}

function copyText(props: propsInf) {
  const { text, children } = props;
  const copyRef = useRef<HTMLSpanElement>(null);

  function copy() {
    console.log('dasd');
    navigator.clipboard.writeText(text).then(() => {
      Toast.show('复制成功');
    });
  }

  return (
    <span ref={copyRef} onClick={copy}>
      {children}
    </span>
  );
}

export default memo(copyText);
