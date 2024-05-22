import { Toast } from 'antd-mobile';
import { memo, useRef } from 'react';

interface propsInf {
  text: string;
  children: React.ReactElement;
}

function CopyText(props: propsInf) {
  const { text, children } = props;
  const copyRef = useRef<HTMLSpanElement>(null);

  /**
   * @description: 复制代码
   * @return {*}
   */
  function copy() {
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

export default memo(CopyText);
