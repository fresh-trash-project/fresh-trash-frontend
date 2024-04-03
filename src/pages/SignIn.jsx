import styled from "styled-components";
import logo from "../assets/logo3.png";
import { VscEye } from "react-icons/vsc";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { PiRecycleDuotone } from "react-icons/pi";
import { FaTrash } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCurrencyExchange } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import {
  Container,
  SignInContainer,
  Logo,
  EyeIcon,
  Drawing,
  SNSIcons,
} from "../styles/SignInCSS";

const SignIn = () => {
  return (
    <Container>
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
            <div>
              <Link>
                <SiNaver className="naver" />
              </Link>
              <Link>
                <RiKakaoTalkFill className="kakao" />
              </Link>
              <Link>
                <FcGoogle className="google" />
              </Link>
            </div>
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
    </Container>
  );
};
export default SignIn;

// Styled-Components---------------------------------------------------------

// const Container = styled.div`
//   height: 100vh;
//   background-color: var(--purple-lilac);
//   background: linear-gradient(
//     to right,
//     var(--purple-dpurple),
//     var(--purple-soft),
//     var(--purple-lilac)
//   );
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const SignInContainer = styled.div`
//   position: relative;
//   width: 800px;
//   max-width: 100%;
//   height: 650px;
//   background-color: var(--white-ivory);
//   border-radius: 30px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
//   overflow: hidden;

//   .text {
//     width: 200px;
//     transform: translateX(290%);
//     p {
//       font-size: large;
//       font-weight: 500;
//       width: 200px;
//       height: auto;
//       margin-right: 20px;
//       margin-top: 20px;
//       text-align: end;
//     }
//     .bold {
//       width: 200px;
//       font-weight: 900;
//       font-size: x-large;
//       margin-right: 20px;
//       margin-top: 5px;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     background-color: lightgray;
//     align-items: center;
//     justify-content: center;
//     padding: 0 40px;
//     border-radius: 30px;
//     position: absolute;
//     top: 0;
//     right: 0;
//     height: 100%;
//     width: 60%;
//     transform: translateX(-43%);

//     h1 {
//       font-size: xxx-large;
//       font-weight: 700;
//       position: absolute;
//       top: 20px;
//       left: 20px;
//       transform: translateX(210%);
//     }
//     .email {
//       width: 400px;
//       max-width: 100%;
//       position: absolute;
//       top: 150px;
//       right: 40px;

//       input {
//         /* font-size: 16px;
//         안바뀜 ㅠㅠ */
//         background-color: white;
//         border: 2px solid grey;
//         margin: 20px 0;
//         padding: 10px 15px;
//         font-size: 13px;
//         border-radius: 10px;
//         width: 100%;
//         height: 40px;
//         outline: none;
//         position: absolute;
//         top: 0;
//         right: 0;
//       }
//       button {
//         background-color: var(--white-ivory);
//         width: 40px;
//         height: 30px;
//         font-size: 12px;
//         color: black;
//         padding: 5px 5px;
//         border: 1px solid transparent;
//         border-radius: 40%;
//         cursor: pointer;
//         margin-top: 38px;
//         position: absolute;
//         top: 50%;
//         right: 3%;
//       }
//     }
//     .password {
//       margin-top: 80px;
//       width: 400px;
//       max-width: 100%;
//       position: absolute;
//       right: 40px;
//       top: 150px;
//       input {
//         background-color: white;
//         border: 2px solid grey;
//         margin: 20px 0;
//         padding: 10px 15px;
//         font-size: 13px;
//         border-radius: 10px;
//         width: 100%;
//         height: 40px;
//         outline: none;
//         position: absolute;
//         top: 0;
//         right: 0;
//       }

//       button {
//         background-color: var(--white-ivory);
//         width: 40px;
//         height: 30px;
//         font-size: 12px;
//         color: black;
//         padding: 5px 5px;
//         border: 1px solid transparent;
//         border-radius: 40%;
//         cursor: pointer;
//         margin-top: 38px;
//         position: absolute;
//         top: 50%;
//         right: 3%;
//       }

//       a {
//         text-decoration: none;
//         color: gray;
//         font-size: 12px;
//         position: absolute;
//         right: 0;
//         top: 90px;
//         &:hover {
//           color: var(--purple-dpurple);
//         }
//       }
//     }

//     .button-signin {
//       position: absolute;
//       top: 78%;
//       right: 40px;

//       button {
//         width: 100%;
//         height: auto;
//         background-color: var(--green-current);
//         color: white;
//         font-size: 25px;
//         font-weight: 600;
//         letter-spacing: 0.5px;
//         padding: 10px 45px;
//         border: none;
//         border-radius: 10px;
//         cursor: pointer;
//         transform: translateX(-158%);
//       }
//     }

//     .toggle-to-signin {
//       position: absolute;
//       right: 40px;
//       top: 90%;
//       transform: translateX(-128%);

//       span {
//         font-size: 12px;
//         color: grey;
//       }
//       button {
//         width: auto;
//         height: auto;
//         margin-left: 10px;
//         background-color: var(--green-olive);
//         color: white;
//         font-size: 12px;
//         padding: 5px 10px;
//         border: none;
//         border-radius: 10px;
//         cursor: pointer;
//         margin-top: 30px;
//         &:hover {
//           background-color: var(--purple-dpurple);
//         }
//       }
//       a {
//         text-decoration: none;
//         color: white;
//       }
//     }
//   }
// `;

// const Logo = styled.div`
//   display: flex;
//   justify-content: end;
//   img {
//     width: 70px;
//     height: auto;
//     margin: 20px;
//   }
// `;

// const EyeIcon = styled(VscEye)`
//   font-size: 20px;
// `;

// const Drawing = styled.div`
//   position: absolute;
//   top: 55%;
//   left: 20px;
//   width: 43%;
//   height: 40%;
//   border-radius: 200px;
//   background-color: var(--green-current);
//   z-index: 2;
//   transform: translateX(120%);

//   p {
//     font-size: xx-large;
//     width: 300px;
//     color: white;
//     font-weight: 600;
//     position: absolute;
//     top: 10%;
//     left: 13%;
//   }

//   .trash-bin {
//     position: absolute;
//     top: 100px;
//     left: 40px;
//     width: 100px;
//     height: auto;
//   }

//   .recycle {
//     position: absolute;
//     top: 130px;
//     left: 60px;
//     color: var(--green-light);
//     width: 60px;
//     height: auto;
//   }

//   .leaf {
//     position: absolute;
//     top: 70px;
//     left: 120px;
//     color: var(--green-light);
//     width: 60px;
//     height: auto;
//   }

//   .dollar {
//     position: absolute;
//     top: 80px;
//     right: 30px;
//     color: var(--yellow-saffron);
//     width: 50px;
//     height: auto;
//   }

//   .money-bag {
//     position: absolute;
//     top: 60px;
//     right: 30px;
//     color: var(--yellow-saffron);
//     width: 60px;
//     height: auto;
//     transform: rotate(225deg);
//   }

//   .money-hand {
//     position: absolute;
//     top: 110px;
//     right: 40px;
//     color: var(--yellow-saffron);
//     width: 100px;
//     height: auto;
//     transform: rotateY(180deg);
//   }
// `;

// const SNSIcons = styled.i`
//   position: absolute;
//   right: 38px;
//   bottom: 6%;
//   transform: translateX(-168%);
//   div {
//     display: flex;
//     align-items: center;
//   }
//   a {
//     border: 2px solid transparent;
//     box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
//     width: 20px;
//     height: 20px;
//     margin: 15px;

//     .naver {
//       color: rgb(3, 199, 90);
//       width: 20px;
//       height: 20px;
//     }
//     .kakao {
//       color: rgb(255, 232, 18);
//       background-color: black;
//       width: 20px;
//       height: 20px;
//     }
//     .google {
//       width: 20px;
//       height: 20px;
//       font-size: 20px;
//     }
//   }
// `;
