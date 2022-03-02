import React from 'react';
import { List, Typography, Divider } from 'antd';
import { GameRow } from '../../../components';
import { User } from '../../../../graphql/queries/User/__generated__/User';

const { Title } = Typography;

interface Props {
  userWishlist: User['user']['wishlist'];
  wishlistPage: number;
  limit: number;
  setWishlistPage: (page: number) => void;
}

export const UserWishlist = ({
  userWishlist,
  wishlistPage,
  limit,
  setWishlistPage,
}: Props) => {
  const total = userWishlist?.total ?? null;
  const result = userWishlist?.result ?? null;

  return (
    userWishlist && (
      <div className="user-bookings">
        <Title level={4} className="user-bookings__title">
          Wishlist
        </Title>
        <Divider />
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={result ?? undefined}
          locale={{
            emptyText: "User doesn't have games in wishlist",
          }}
          pagination={{
            position: 'top',
            current: wishlistPage,
            total: total ?? undefined,
            defaultPageSize: limit,
            hideOnSinglePage: true,
            showLessItems: true,
            onChange: (page: number) => setWishlistPage(page),
          }}
          renderItem={userWishlist => <GameRow game={userWishlist.game} />}
        />
      </div>
    )
  );
};
