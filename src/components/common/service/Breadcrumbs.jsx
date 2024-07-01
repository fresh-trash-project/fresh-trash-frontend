const Breadcrumbs = ({ items }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
