import styled from "styled-components";
import logo from "../assets/logo3.png";
import { Link } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { PiRecycleDuotone } from "react-icons/pi";
import { FaTrash } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { TbMoneybag, TbRubberStampOff } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCurrencyExchange } from "react-icons/md";
import SignIn from "./SignIn";

const SignUp = () => {
  return (
    <Container>
      <SignUpContainer>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>

        <div className="text">
          <p>We invite you to</p>
          <div className="bold">FRESH TRASH</div>
        </div>

        <Drawing>
          <p>WELCOME</p>
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
    </Container>
  );
};
export default SignUp;

// Styled-Components---------------------------------------------------------

const Container = styled.div`
  height: 100vh;
  background-color: var(--purple-lilac);
  background: linear-gradient(
    to right,
    var(--purple-soft),
    var(--purple-lilac)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SignUpContainer = styled.div`
  position: relative;
  width: 800px;
  max-width: 100%;
  height: 650px;
  background-color: var(--white-ivory);
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  overflow: hidden;

  .text {
    width: 200px;
    p {
      font-size: large;
      font-weight: 500;
      width: 200px;
      height: auto;
      margin-left: 20px;
      margin-top: 20px;
    }
    .bold {
      width: 200px;
      font-weight: 900;
      font-size: x-large;
      margin-left: 50px;
      margin-top: 5px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: lightgray;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    border-radius: 30px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 60%;

    h1 {
      font-size: xxx-large;
      font-weight: 700;
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .email {
      width: 400px;
      max-width: 100%;
      position: absolute;
      top: 150px;
      right: 40px;

      input {
        /* font-size: 16px;
        안바뀜 ㅠㅠ */
        background-color: white;
        border: 2px solid grey;
        margin: 20px 0;
        padding: 10px 15px;
        font-size: 13px;
        border-radius: 10px;
        width: 100%;
        height: 40px;
        outline: none;
        position: absolute;
        top: 0;
        right: 0;
      }
      button {
        background-color: var(--white-ivory);
        width: 40px;
        height: 30px;
        font-size: 12px;
        color: black;
        padding: 5px 5px;
        border: 1px solid transparent;
        border-radius: 40%;
        cursor: pointer;
        margin-top: 38px;
        position: absolute;
        top: 50%;
        right: 3%;
      }
    }

    .user-name {
      margin-top: 80px;
      width: 400px;
      max-width: 100%;
      position: absolute;
      right: 40px;
      top: 150px;
      input {
        background-color: white;
        border: 2px solid grey;
        margin: 20px 0;
        padding: 10px 15px;
        font-size: 13px;
        border-radius: 10px;
        width: 100%;
        height: 40px;
        outline: none;
        position: absolute;
        top: 0;
        right: 0;
      }
      button {
        background-color: var(--white-ivory);
        width: 40px;
        height: auto;
        font-size: 12px;
        color: black;
        padding: 5px 5px;
        border: 1px solid transparent;
        border-radius: 40%;
        cursor: pointer;
        margin-top: 38px;
        position: absolute;
        top: -6px;
        right: 3%;
      }
    }

    .password {
      margin-top: 160px;
      width: 400px;
      max-width: 100%;
      position: absolute;
      right: 40px;
      top: 150px;
      input {
        background-color: white;
        border: 2px solid grey;
        margin: 20px 0;
        padding: 10px 15px;
        font-size: 13px;
        border-radius: 10px;
        width: 100%;
        height: 40px;
        outline: none;
        position: absolute;
        top: 0;
        right: 0;
      }
      button {
        background-color: var(--white-ivory);
        width: 40px;
        height: 30px;
        font-size: 12px;
        color: black;
        padding: 5px 5px;
        border: 1px solid transparent;
        border-radius: 40%;
        cursor: pointer;
        margin-top: 38px;
        position: absolute;
        top: 50%;
        right: 3%;
      }
    }
    .button-signup {
      position: absolute;
      top: 78%;
      right: 40px;

      button {
        width: 100%;
        height: auto;
        background-color: var(--green-current);
        color: white;
        font-size: 25px;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding: 10px 45px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
      }
    }

    .toggle-to-signup {
      position: absolute;
      right: 40px;
      top: 90%;

      span {
        font-size: 12px;
        color: grey;
      }
      button {
        width: auto;
        height: auto;
        margin-left: 10px;
        background-color: var(--green-olive);
        color: white;
        font-size: 12px;
        padding: 5px 10px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 30px;
        &:hover {
          background-color: var(--purple-dpurple);
        }
      }
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
`;

const Logo = styled.div`
  img {
    width: 70px;
    height: auto;
    margin: 20px;
  }
`;

const EyeIcon = styled(VscEye)`
  font-size: 20px;
`;

const Drawing = styled.div`
  position: absolute;
  top: 55%;
  left: 20px;
  width: 43%;
  height: 40%;
  border-radius: 200px;
  background-color: var(--green-current);
  z-index: 2;

  p {
    font-size: xx-large;
    color: white;
    font-weight: 600;
    position: absolute;
    top: 10%;
    left: 25%;
  }

  .trash-bin {
    position: absolute;
    top: 100px;
    left: 40px;
    width: 100px;
    height: auto;
  }

  .recycle {
    position: absolute;
    top: 130px;
    left: 60px;
    color: var(--green-light);
    width: 60px;
    height: auto;
  }

  .leaf {
    position: absolute;
    top: 70px;
    left: 120px;
    color: var(--green-light);
    width: 60px;
    height: auto;
  }

  .dollar {
    position: absolute;
    top: 80px;
    right: 30px;
    color: var(--yellow-saffron);
    width: 50px;
    height: auto;
  }

  .money-bag {
    position: absolute;
    top: 60px;
    right: 30px;
    color: var(--yellow-saffron);
    width: 60px;
    height: auto;
    transform: rotate(225deg);
  }

  .money-hand {
    position: absolute;
    top: 110px;
    right: 40px;
    color: var(--yellow-saffron);
    width: 100px;
    height: auto;
    transform: rotateY(180deg);
  }
`;
