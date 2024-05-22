import { SpinLoading } from 'antd-mobile';
import React from 'react';

interface LoadingPropsInf {
  children: React.ReactNode;
  loading: boolean;
}

export default function Loading(props: LoadingPropsInf) {
  const { children, loading } = props;
  return (
    <div style={{ position: 'relative' }}>
      {loading ? (
        <div
          style={{
            position: 'fixed',
            inset: '0',
            zIndex: '10',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <SpinLoading color="currentColor" />
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
