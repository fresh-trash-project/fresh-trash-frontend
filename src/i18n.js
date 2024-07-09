import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import en from './locales/en.json';
import ko from './locales/ko.json';
import koCategory from './locales/ko/category.json';
import koAuction from './locales/ko/auction.json';
import koChat from './locales/ko/chat.json';
import koEntry from './locales/ko/entry.json';
import koItemStatus from './locales/ko/itemStatus.json';
import koMyList from './locales/ko/myList.json';
import koNotification from './locales/ko/notification.json';
import koPagination from './locales/ko/pagination.json';
import koPay from './locales/ko/pay.json';
import koPrice from './locales/ko/price.json';
import koSorting from './locales/ko/sorting.json';
import koTime from './locales/ko/time.json';
import koTransactionStatus from './locales/ko/transactionStatus.json';
import koUserInfo from './locales/ko/userInfo.json';
import enCategory from './locales/en/category.json';
import enAuction from './locales/en/auction.json';
import enChat from './locales/en/chat.json';
import enEntry from './locales/en/entry.json';
import enItemStatus from './locales/en/itemStatus.json';
import enMyList from './locales/en/myList.json';
import enNotification from './locales/en/notification.json';
import enPagination from './locales/en/pagination.json';
import enPay from './locales/en/pay.json';
import enPrice from './locales/en/price.json';
import enSorting from './locales/en/sorting.json';
import enTime from './locales/en/time.json';
import enTransactionStatus from './locales/en/transactionStatus.json';
import enUserInfo from './locales/en/userInfo.json';

const koMerged = {
  ...ko,
  ...koCategory,
  ...koAuction,
  ...koChat,
  ...koEntry,
  ...koItemStatus,
  ...koMyList,
  ...koNotification,
  ...koPagination,
  ...koPay,
  ...koPrice,
  ...koSorting,
  ...koTime,
  ...koTransactionStatus,
  ...koUserInfo,
};

const enMerged = {
  ...en,
  ...enCategory,
  ...enAuction,
  ...enChat,
  ...enEntry,
  ...enItemStatus,
  ...enMyList,
  ...enNotification,
  ...enPagination,
  ...enPay,
  ...enPrice,
  ...enSorting,
  ...enTime,
  ...enTransactionStatus,
  ...enUserInfo,
};

const resources = {
  en: {
    translation: enMerged,
  },
  ko: {
    translation: koMerged,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
