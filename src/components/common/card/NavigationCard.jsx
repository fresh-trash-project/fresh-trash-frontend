import { Link } from 'react-router-dom';

const NavigationCard = ({ title, phrase, link, image }) => {
  return (
    <div className="card max-w-2xl lg:card-side bg-base-100 shadow-xl lg:max-w-5xl mx-auto mb-10">
      <figure className="h-[30rem] lg:w-[40rem] md:max-w-2xl">
        <img src={image} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p>{phrase}</p>
        <Link to={link} className="card-actions justify-end">
          <button className="btn text-white bg-green-brunswick border-green-brunswick hover:bg-green-brunswick hover:opacity-90 hover:scale-110">
            View Now
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NavigationCard;
