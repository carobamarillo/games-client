import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER } from '../../graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../graphql/queries/User/__generated__/User';
import { Col, Layout, Row } from 'antd';
import { UserProfileCard, UserGames, UserWishlist } from './components';
import { PageSkeleton, ErrorNotification } from '../components';
import './styles/index.css';
import { Viewer } from '../../types';

const { Content } = Layout;
const PAGE_LIMIT = 5;

type MatchParams = {
  id: string;
};

interface Props {
  viewer: Viewer;
}

export const User = ({ viewer }: Props) => {
  const [gamesPage, setGamesPage] = useState(1);
  const [wishlistPage, setWishlistPage] = useState(1);

  const { id = '' } = useParams<MatchParams>();

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id,
      wishlistPage,
      gamesPage,
      limit: PAGE_LIMIT,
    },
  });

  const renderUserGames = () => {
    return (
      <UserGames
        userGames={data?.user.games!}
        gamesPage={gamesPage}
        limit={PAGE_LIMIT}
        setGamesPage={setGamesPage}
      />
    );
  };

  const renderUserWishlist = () => (
    <UserWishlist
      userWishlist={data?.user?.wishlist!}
      wishlistPage={wishlistPage}
      limit={PAGE_LIMIT}
      setWishlistPage={setWishlistPage}
    />
  );

  return (
    <Content className="user">
      {error && (
        <ErrorNotification description="An error has ocurred try again later" />
      )}
      {loading && <PageSkeleton />}
      <Row align="middle" justify="center">
        <Col xs={24} flex="flex">
          {data?.user && <UserProfileCard user={data.user} />}
        </Col>
        <Col xs={24} flex="flex">
          {data?.user.games && renderUserGames()}
        </Col>
        <Col xs={24} flex="flex">
          {data?.user.wishlist && renderUserWishlist()}
        </Col>
      </Row>
    </Content>
  );
};
