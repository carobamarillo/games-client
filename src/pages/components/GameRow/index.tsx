import React, { useState } from 'react';
import { List, Button, Avatar, Modal } from 'antd';

interface Props {
  game: {
    id: string;
    name: string;
    description: string;
    code: string;
    icon: string;
    url: string;
  };
}

export const GameRow = ({ game }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { name, description, icon, url } = game;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <List.Item
      actions={[
        <Button onClick={showModal} type="primary">
          Play
        </Button>,
      ]}
    >
      <Modal
        title={name}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        width={850}
      >
        <iframe
          src={url}
          title={name}
          style={{ border: '0px #ffffff none;' }}
          name="myiFrame"
          scrolling="no"
          frameBorder="1"
          height="500px"
          width="800px"
        />
      </Modal>
      <List.Item.Meta
        title={name}
        description={description}
        avatar={<Avatar src={icon} shape="square" size={100} />}
        className="game-row__item"
      />
    </List.Item>
  );
};
