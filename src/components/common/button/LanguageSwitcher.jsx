import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex -space-x-3 md:-space-x-1 lg:space-x-1">
      <button
        className="btn btn-ghost btn-circle text-xs md:text-[1rem] lg:text-lg justify-end"
        onClick={() => changeLanguage('en')}
      >
        ENG
      </button>
      <button
        className="btn btn-ghost btn-circle text-xs md:text-[1rem] lg:text-lg justify-end"
        onClick={() => changeLanguage('ko')}
      >
        KOR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
