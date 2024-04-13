import { Link } from "react-router-dom";
import { Mobile, EyeIcon } from "../styles/SignUpMobileCSS";

const SignUpMobile = () => {
  return (
    <Mobile>
      <div className="form-container sign-up">
        <div className="logo">로고</div>
        <form>
          <h1>
            We invite you to
            <span className="bold">FRESH TRASH</span>
          </h1>

          <input type="email" placeholder="Email" />
          <button className="input-button email-button">인증</button>
          <input type="text" placeholder="User Name" />
          <button className="input-button user-name-button">
            중복
            <br />
            확인
          </button>
          <input type="password" placeholder="Password" className="password" />
          <EyeIcon />
          <button>회원 가입</button>

          <div className="switch">
            <p>Already have an account?</p>
            <Link to="/SignIn">
              <button>Sign In</button>
            </Link>
          </div>
        </form>
      </div>
    </Mobile>
  );
};
export default SignUpMobile;
