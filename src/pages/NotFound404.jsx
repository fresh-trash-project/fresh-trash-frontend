import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound404 = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8"> {t('PAGE_NOT_FOUND_ENG')}</p>
      <Link to="/" className="px-4 py-2 bg-green-brunswick text-white rounded">
        {t('GO_HOME')}
      </Link>
    </div>
  );
};

export default NotFound404;
