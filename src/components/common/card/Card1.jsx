import { Link } from 'react-router-dom';

const Card1 = ({ title, phrase, link }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-5xl mx-auto mb-10">
      <figure>
        <img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p>{phrase}</p>
        <Link to={link} className="card-actions justify-end">
          <button className="btn text-white bg-[var(--green-brunswick)] border-[var(--green-brunswick)] hover:bg-[var(--green-brunswick)] hover:opacity-90 hover:scale-110">
            View Now
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Card1;
