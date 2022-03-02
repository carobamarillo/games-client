import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER } from '../../graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../graphql/queries/User/__generated__/User';
import { Col, Layout, Row } from 'antd';
import { UserProfileCard, UserGames, UserWishlist } from '../User/components';
import { PageSkeleton, ErrorNotification } from '../components';
import './styles/index.css';
import { Viewer } from '../../types';

const { Content } = Layout;
const PAGE_LIMIT = 5;

interface Props {
  viewer: Viewer;
}

export const Games = ({ viewer }: Props) => {
  const [gamesPage, setGamesPage] = useState(1);
  const [wishlistPage, setWishlistPage] = useState(1);

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: viewer.id || '',
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

  return (
    <Content className="user">
      {error && (
        <ErrorNotification description="An error has ocurred try again later" />
      )}
      {loading && <PageSkeleton />}
      <Row align="middle" justify="center">
        <Col xs={24} flex="flex">
          {data?.user.games && renderUserGames()}
        </Col>
      </Row>
    </Content>
  );
};
