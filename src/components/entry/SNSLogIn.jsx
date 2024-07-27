import { Link } from 'react-router-dom';
import { globalOauthAPI } from '../../../variable';
import { Google, Naver, Kakao } from '../common/service/SNS';

const SNSLogIn = () => {
  return (
    <div className="snsIcons flex w-full">
      <Link
        to={`${globalOauthAPI}/google`}
        className="cursor-pointer shadow-md border border-green-brunswick p-2 rounded-full mr-1"
      >
        <Google style="w-4 h-4" />
      </Link>
      <Link
        to={`${globalOauthAPI}/naver`}
        className="cursor-pointer shadow-md border border-green-brunswick p-2 rounded-full mr-1"
      >
        <Naver style="w-4 h-4" />
      </Link>
      <Link
        to={`${globalOauthAPI}/kakao`}
        className="cursor-pointer shadow-md border border-green-brunswick p-2 rounded-full mr-1"
      >
        <Kakao style="w-4 h-4" />
      </Link>
    </div>
  );
};

export default SNSLogIn;
