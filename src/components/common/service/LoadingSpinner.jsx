import { ClipLoader } from 'react-spinners';

const greenBrunswick = '#275a53';

const LoadingSpinner = ({ size = 50, color = greenBrunswick, loading }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  );
};

export default LoadingSpinner;
