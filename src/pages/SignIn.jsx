import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <SignInContainer>
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Link>Forgot Password</Link>
        <button>로그인</button>
        <div className="sns-icons">
          <Link>
            <SiNaver />
          </Link>
          <Link>
            <RiKakaoTalkFill />
          </Link>
          <Link>
            <FcGoogle />
          </Link>
        </div>
      </form>
      <div className="toggle-to-signup">
        <span>Don&apos;t have an Account?</span>
        <button>Sign Up</button>
      </div>
    </SignInContainer>
  );
};
export default SignIn;

const SignInContainer = styled.div`
  background-color: ;
`;
