import React from 'react';
import { Skeleton } from 'antd';

export const PageSkeleton = () => {
  const skeletonItem = (
    <Skeleton
      active
      paragraph={{ rows: 4 }}
      className="page-skeleton__paragraph"
    />
  );

  return (
    <>
      {skeletonItem}
      {skeletonItem}
      {skeletonItem}
      {skeletonItem}
    </>
  );
};
