import logo from "../assets/logo3.png";
import { PiRecycleDuotone } from "react-icons/pi";
import { FaTrash } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCurrencyExchange } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiKakaoTalkFill, RiGoogleFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

import {
  Container,
  SignInContainer,
  Logo,
  EyeIcon,
  Drawing,
  SNSIcons,
} from "../styles/SignInCSS";
import { useEffect, useState } from "react";
import SignInMobile from "./SignInMobile";

const SignIn = () => {
  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleWindowWidth = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleWindowWidth);
    return () => window.removeEventListener("resize", handleWindowWidth);
  }, [windowWidth]);

  return (
    <Container>
      {windowWidth >= 580 ? (
        <SignInContainer>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>

          <div className="text">
            <p>It&apos;s time to</p>
            <div className="bold">FRESH TRASH</div>
          </div>

          <Drawing>
            <p>WELCOME BACK</p>
            <i className="drawing-icons">
              <FaTrash className="trash-bin" />
              <PiRecycleDuotone className="recycle" />
              {/* <RiMoneyDollarCircleLine className="dollar" /> */}
              <FaLeaf className="leaf" />
              {/* <TbMoneybag className="money-bag" /> */}
              <GiReceiveMoney className="money-hand" />
              <MdCurrencyExchange className="dollar" />
            </i>
          </Drawing>

          <form>
            <h1>Sign In</h1>

            <div className="email">
              <input type="email" placeholder="Email" />
            </div>

            <div className="password">
              <input type="password" placeholder="Password" />
              <button>
                <EyeIcon />
              </button>
              <Link>Forgot Password</Link>
            </div>

            <SNSIcons>
              <Link>
                <SiNaver className="naver" />
              </Link>
              <Link>
                <RiKakaoTalkFill className="kakao" />
              </Link>
              <Link>
                <RiGoogleFill className="google" />
                {/* <FcGoogle className="google" /> */}
              </Link>
            </SNSIcons>

            <div className="button-signin">
              <button type="submit">로그인</button>
            </div>

            <div className="toggle-to-signin">
              <span>Don&apos;t have an Account?</span>
              <Link to="/SignUp">
                <button>Sign Up</button>
              </Link>
            </div>
          </form>
        </SignInContainer>
      ) : (
        <SignInMobile />
      )}
    </Container>
  );
};
export default SignIn;
