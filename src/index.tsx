import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  useMutation,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Layout, Affix, Spin } from 'antd';
import { Viewer } from './types';
import { LOG_IN } from './graphql/mutations/LogIn/index';
import {
  LogIn as LogInData,
  LogInVariables,
} from './graphql/mutations/LogIn/__generated__/LogIn';
import {
  HeaderApp,
  HeaderAppSkeleton,
  ErrorNotification,
} from './pages/components';
import { Home, Host, Game, Games, NotFound, User, Login } from './pages';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';

const httpLink = createHttpLink({
  uri: '/api',
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');

  return { headers: { 'X-CSRF-TOKEN': token || '' } };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  headers: {
    'X-CSRF-TOKEN': sessionStorage.getItem('token') || '',
  },
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout id="app" className="app-skeleton">
        <HeaderAppSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Games app" />
        </div>
      </Layout>
    );
  }

  return (
    <Router>
      <Layout id="app">
        {error && (
          <ErrorNotification description="We weren't able to verify if you are logged in, try again later." />
        )}
        <Affix offsetTop={0} className="app__affix-header">
          <HeaderApp viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Routes>
          <Route path="/" element={<Home viewer={viewer} />} />
          <Route path="/host" element={<Host />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/games" element={<Games viewer={viewer} />} />
          <Route path="/user/:id" element={<User viewer={viewer} />} />
          <Route path="/login" element={<Login setViewer={setViewer} />} />
          <Route element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
