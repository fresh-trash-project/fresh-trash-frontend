import logo from '../assets/logo3.png';
import { Link } from 'react-router-dom';
import { PiRecycleDuotone } from 'react-icons/pi';
import { FaTrash } from 'react-icons/fa6';
import { FaLeaf } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdCurrencyExchange } from 'react-icons/md';
import {
  Container,
  SignUpContainer,
  Logo,
  EyeIcon,
  Drawing,
} from '../styles/SignUpCSS.jsx';
import { useEffect, useState } from 'react';
import SignUpMobile from './SignUpMobile.jsx';

const SignUp = () => {
  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleWindowWidth = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener('resize', handleWindowWidth);
    return () => window.removeEventListener('resize', handleWindowWidth);
  }, [windowWidth]);

  return (
    <Container>
      {windowWidth >= 580 ? (
        <SignUpContainer>
          {/*//*로고        */}
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>

          {/* //*로고 밑 글씨 */}
          <div className="text">
            <p>We invite you to</p>
            <div className="bold">FRESH TRASH</div>
          </div>

          {/* //*그림 */}
          <Drawing>
            <p>WELCOME</p>
            <i className="drawing-icons">
              <FaTrash className="trash-bin" />
              <PiRecycleDuotone className="recycle" />
              <FaLeaf className="leaf" />
              <GiReceiveMoney className="money-hand" />
              <MdCurrencyExchange className="dollar" />
            </i>
          </Drawing>

          {/* //*입력란-회색영역*/}
          <form>
            <h1>Create Account</h1>

            <div className="email">
              <input type="email" placeholder="Email" />
              <button type="submit">인증</button>
            </div>

            <div className="user-name">
              <input type="text" placeholder="User Name" />
              <button type="submit">중복확인</button>
            </div>

            <div className="password">
              <input type="password" placeholder="Password" />
              <button>
                <EyeIcon />
              </button>
            </div>

            <div className="button-signup">
              <button type="submit">회원 가입</button>
            </div>

            <div className="toggle-to-signup">
              <span>Already have an Account?</span>
              <Link to="/SignIn">
                <button>Sign In</button>
              </Link>
            </div>
          </form>
        </SignUpContainer>
      ) : (
        <SignUpMobile />
      )}
    </Container>
  );
};
export default SignUp;
