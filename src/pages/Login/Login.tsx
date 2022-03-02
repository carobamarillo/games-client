import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/client';
import { LOG_IN } from '../../graphql/mutations/LogIn/index';
import { AUTH_URL } from '../../graphql/queries/AuthUrl';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../../graphql/mutations/LogIn/__generated__/LogIn';
import { AuthUrl as AuthUrlData } from '../../graphql/queries/AuthUrl/__generated__/AuthUrl';
import { Viewer } from '../../types';
import { ErrorNotification } from '../components';
import { showErrorMesssage, showSuccessNotificacion } from '../../utils';
import googleLogo from './assets/google_logo.png';
import { Layout, Card, Typography, Spin } from 'antd';
const { Content } = Layout;
const { Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}
export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();
  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] =
    useMutation<LogInData, LogInVariables>(LOG_IN, {
      onCompleted: data => {
        if (data && data.logIn && data.logIn.token) {
          setViewer(data.logIn);
          sessionStorage.setItem('token', data.logIn.token);
          showSuccessNotificacion("You've logged in!");
          window.location.href = '/';
        }
      },
    });

  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code)
      logInRef.current({
        variables: {
          input: { code },
        },
      });
  }, []);

  const handleAuth = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });

      window.location.href = data.authUrl;
    } catch (e) {
      showErrorMesssage(
        "Sorry! We weren't able to log you in. Please try again later!",
      );
    }
  };

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;

    return <Navigate to={`/user/${viewerId}`} />;
  }

  return (
    <Content className="log-in">
      {logInError && (
        <ErrorNotification message="Sorry! We weren't able to log you in. Please try again later!" />
      )}
      <Card className="log-in-card">
        <div className="log-in-card__container">
          <Title level={3} className="log-in-card__container-title">
            <span>👋🏻</span>
          </Title>
          <Title level={3} className="log-in-card__container-title">
            Log in to Games 🎲
          </Title>
        </div>
        <button className="log-in-card__button" onClick={handleAuth}>
          <img
            src={googleLogo}
            alt="google logo"
            className="log-in-card__button-img"
          />
          <span className="log-in-card__button-text">Sign in with Google</span>
        </button>
      </Card>
    </Content>
  );
};
