import { I18n } from 'react-i18nify';

export default message => {

  message = message.trim();
  message = `${I18n.t(message)}`;
  return message;
};
