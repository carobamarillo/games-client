import React from 'react';
import { Skeleton, Divider } from 'antd';

// interface Props {
//   title: string;
// }

export const GamesSkeleton = () => {
  return (
    <>
      <Skeleton paragraph={{ rows: 3 }} active />
      <Divider />
      <Skeleton paragraph={{ rows: 3 }} active />
      <Divider />
      <Skeleton paragraph={{ rows: 3 }} active />
    </>
  );
};
