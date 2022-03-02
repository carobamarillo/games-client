import { message, notification } from 'antd';

export const showSuccessNotificacion = (
  message: string,
  description?: string,
) =>
  notification['success']({
    message,
    description,
    placement: 'topLeft',
    style: {
      marginTop: 50,
    },
  });

export const showErrorMesssage = (error: string) => message.error(error);
