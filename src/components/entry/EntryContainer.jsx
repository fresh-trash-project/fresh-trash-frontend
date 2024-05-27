const EntryContainer = ({
  title,
  phrase,
  buttonText,
  onClick,
  children,
  signInPanel,
  translation,
}) => {
  return (
    <div
      signInPanel={signInPanel}
      className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all ${translation}`}
    >
      <div className="text-center bg-green-brunswick text-white py-8 px-10 leading-5 md:hidden">
        <h1 className="font-bold text-xl">{title}</h1>
        <p>{phrase}</p>
      </div>
      {children}
      <div className="text-center bg-green-brunswick text-white py-8 px-10 flex justify-end md:hidden">
        <p className="mr-2 text-sm">{buttonText}</p>
        <button
          onClick={onClick}
          className="btn btn-xs bg-transparent text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EntryContainer;
