import NotFound404 from '../../../pages/NotFound404';
import { useTranslation } from 'react-i18next';

const ErrorElement = ({ error }) => {
  const { t } = useTranslation();
  console.error(error);

  if (error.status === 404) {
    return <NotFound404 />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">{t('ERROR')}</h1>
      <p className="text-xl text-gray-600 mb-8">{t('UNEXPECTED_ERROR_ENG')}</p>
      <Link to="/" className="px-4 py-2 bg-green-brunswick text-white rounded">
        {t('GO_HOME')}
      </Link>
    </div>
  );
};

export default ErrorElement;
