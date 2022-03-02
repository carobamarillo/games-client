import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Viewer } from '../../../../../types';
import { Avatar, Button, Menu } from 'antd';
import { LOG_OUT } from '../../../../../graphql/mutations/LogOut';
import { LogOut as LogOutData } from '../../../../../graphql/mutations/LogOut/__generated__/LogOut';
import {
  showSuccessNotificacion,
  showErrorMesssage,
} from '../../../../../utils';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        showSuccessNotificacion(
          "You've successfully logged out! Hope we'll see you again soon",
        );
        window.location.href = '/';
      }
    },
    onError: data =>
      showErrorMesssage(
        "Sorry, we weren't able to log you out. Try again later",
      ),
  });

  const handleLogout = () => logOut();

  const subMenuLogin = viewer.id ? (
    <Menu.Item>
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Menu.Item key="/user">
          <Link to={`/user/${viewer.id}`}>
            <UserOutlined />
            <span>Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <div onClick={handleLogout}>
            <LogoutOutlined />
            <span>Logout</span>
          </div>
        </Menu.Item>
      </SubMenu>
    </Menu.Item>
  ) : (
    <Menu.Item>
      <Link to="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </Menu.Item>
  );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Menu.Item>{subMenuLogin}</Menu.Item>
    </Menu>
  );
};
