import Breadcrumbs from '../service/Breadcrumbs';

const Label = ({ children, padding = null, breadcrumbItems }) => {
  return (
    <div role="tablist" className="tabs tabs-boxed shadow-md">
      <div className="px-4">
        <div className="flex justify-between mt-1">
          {<div className={padding}>{children}</div> || <div></div>}
          <div className="hidden md:block">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Label;
