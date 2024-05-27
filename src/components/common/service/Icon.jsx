const Icon = ({ iconPaths }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4 opacity-70"
    >
      {iconPaths.map(({ d, fillRule = null, clipRule = null }, index) => (
        <path key={index} d={d} fillRule={fillRule} clipRule={clipRule} />
      ))}
    </svg>
  );
};

export default Icon;
