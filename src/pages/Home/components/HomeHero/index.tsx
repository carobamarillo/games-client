import React from 'react';
import { Card, Col, Input, Row } from 'antd';

import deadoralive from './assets/deadoralive.jpg';
import jackandbeanstalk from './assets/jackandbeanstalk.jpg';
import jackhammer from './assets/jackhammer.jpg';
import starburst from './assets/starburst.jpg';
import twinspin from './assets/twinspin.jpg';

const { Search } = Input;

export const HomeHero = () => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Search
          placeholder="Search deadoralive"
          size="large"
          enterButton
          className="home-hero__search-input"
        />
      </div>
      <Row gutter={12} className="home-hero__cards">
        <Col md={6} xs={12}>
          <Card cover={<img src={deadoralive} alt="game" />}>
            Dead or alive
          </Card>
        </Col>
        <Col md={6} xs={12}>
          <Card cover={<img src={jackandbeanstalk} alt="game" />}>
            Jack and Beans Talk
          </Card>
        </Col>
        <Col md={6} xs={0}>
          <Card cover={<img src={jackhammer} alt="game" />}>Jack Hammer</Card>
        </Col>
        <Col md={6} xs={0}>
          <Card cover={<img src={starburst} alt="game" />}>Starburst</Card>
        </Col>
        <Col md={6} xs={0}>
          <Card cover={<img src={twinspin} alt="game" />}>Twin Spin</Card>
        </Col>
      </Row>
    </div>
  );
};
