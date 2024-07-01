import Breadcrumbs from '../service/Breadcrumbs';

const Label = ({ children, breadcrumbItems }) => {
  return (
    <div role="tablist" className="tabs tabs-boxed shadow-md">
      <div className="px-4">
        <div className="flex justify-between mt-1">
          {children || <div></div>}
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>
    </div>
  );
};

export default Label;
