import { Link } from "react-router-dom";
import { RiKakaoTalkFill, RiGoogleFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { Mobile, EyeIcon } from "../styles/SignInMobileCSS";

const SignInMobile = () => {
  return (
    <Mobile>
      <div className="form-container sign-in">
        <form>
          <div className="logo">로고</div>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <EyeIcon />
          <span>Forgot password </span>

          <button>로그인</button>

          <div className="sns-icons">
            <Link>
              <SiNaver className="sns-icon naver" />
            </Link>
            <Link>
              <RiKakaoTalkFill className="sns-icon kakao" />
            </Link>
            <Link>
              <RiGoogleFill className="sns-icon google" />
            </Link>
          </div>
        </form>
        <h1>
          <span>It&apos;s time to </span>
          <span className="bold">FRESH TRASH</span>
        </h1>
        <div className="switch">
          <p>Don&apos;t have an account?</p>
          <Link to="/SignUp">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </Mobile>
  );
};
export default SignInMobile;
