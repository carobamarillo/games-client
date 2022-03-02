import React from 'react';
import { Alert } from 'antd';

interface Props {
  message?: string;
  description?: string;
}

export const ErrorNotification = ({
  message = 'Ups! Something went wrong 😿',
  description = 'Please check your connection or try again later ✨',
}: Props) => (
  <Alert
    banner
    closable
    message={message}
    description={description}
    type="error"
    className="error-notification"
  />
);
