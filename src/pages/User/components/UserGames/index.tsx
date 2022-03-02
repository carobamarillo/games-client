import React from 'react';
import { List, Typography, Divider } from 'antd';
import { GameRow } from '../../../components';
import { User } from '../../../../graphql/queries/User/__generated__/User';

const { Title } = Typography;

interface Props {
  userGames: User['user']['games'];
  gamesPage: number;
  limit: number;
  setGamesPage: (page: number) => void;
}

export const UserGames = ({
  userGames,
  gamesPage,
  limit,
  setGamesPage,
}: Props) => {
  const { total, result } = userGames;

  return (
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        Games
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={result || undefined}
        locale={{ emptyText: "User doesn't have games in this list just yet" }}
        pagination={{
          position: 'top',
          current: gamesPage,
          total,
          defaultPageSize: limit,
          hideOnSinglePage: true,
          showLessItems: true,
          onChange: (page: number) => setGamesPage(page),
        }}
        renderItem={userGame => <GameRow game={userGame} />}
      />
    </div>
  );
};
