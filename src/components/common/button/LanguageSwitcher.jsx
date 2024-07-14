import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ padding }) => {
  const { i18n } = useTranslation();

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="inline-flex border-2 border-white rounded-md overflow-hidden">
      <button
        className={`${padding} text-xs md:text-[1rem] lg:text-lg focus:outline-none transition-transform duration-200 ${i18n.language === 'en' ? 'bg-green-brunswick text-white shadow-lg font-extrabold' : 'bg-gray-200 text-gray-400'}`}
        onClick={() => changeLanguage('en')}
      >
        ENG
      </button>
      <button
        className={`${padding} text-xs md:text-[1rem] lg:text-lg focus:outline-none transition-transform duration-200 ${i18n.language === 'ko' ? 'bg-green-brunswick text-white shadow-lg font-extrabold' : 'bg-gray-200 text-gray-400'}`}
        onClick={() => changeLanguage('ko')}
      >
        KOR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
