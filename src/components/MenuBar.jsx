import { AiOutlineMenu } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";
import "../index.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";
import { useState } from "react";
import { Nav, Hamburger, Close, HamburgerLink } from "../styles/MenuBarCSS";

const MenuBar = () => {
  const [openHamburger, setOpenHamburger] = useState(false);

  return (
    <Nav>
      <div className="navLeft">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          <Link to="/ProductsList">폐기물 거래</Link>
        </div>
        <div>
          <Link to="/AuctionList">폐기물 경매</Link>
        </div>
        <div className="toggle">
          {openHamburger ? (
            <Close
              onClick={() => {
                setOpenHamburger(!openHamburger);
              }}
            />
          ) : (
            <Hamburger
              onClick={() => {
                setOpenHamburger(!openHamburger);
              }}
            />
          )}
        </div>
      </div>

      <div className="navRight">
        <div>
          <Link to="/SignIn">로그인</Link>
        </div>
        <div>
          <Link to="SignUp">회원가입</Link>
        </div>
      </div>

      <HamburgerLink state={openHamburger}>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => {
                setOpenHamburger(false);
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/ProductsList"
              onClick={() => {
                setOpenHamburger(false);
              }}
            >
              폐기물 거래
            </Link>
          </li>
          <li>
            <Link
              to="/AuctionList"
              onClick={() => {
                setOpenHamburger(false);
              }}
            >
              폐기물 경매
            </Link>
          </li>
        </ul>
      </HamburgerLink>
    </Nav>
  );
};
export default MenuBar;

// Styled-Components ---------------------------------------------------------------------------------

// const Nav = styled.nav`
//   width: 100%;
//   height: 80px;
//   background-color: var(--green-current);
//   display: flex;
//   /* flex-direction: column; */

//   .logo img {
//     max-width: 60px;
//     margin: 10px;
//     height: auto;
//   }
//   .navLeft {
//     flex: 70%;
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     padding-left: 5%;
//     color: white;
//     a {
//       color: white;
//       font-size: x-large;
//       text-decoration: none;
//       margin: 10px;

//       @media (max-width: 768px) {
//         display: none;
//       }
//     }
//   }
//   .navRight {
//     flex: 30%;
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     padding-right: 50px;
//     color: var(--white);

//     a {
//       color: white;
//       font-size: large;
//       text-decoration: none;
//       margin: 5px;
//       width: 100px;
//     }
//   }
// `;

// const Hamburger = styled(AiOutlineMenu)`
//   width: 70px;
//   height: 50px;
//   background: none;
//   border: none;
//   color: white;
//   font-size: 45px;
//   cursor: pointer;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const Close = styled(VscChromeClose)`
//   width: 70px;
//   height: 50px;
//   background: none;
//   border: none;
//   color: white;
//   font-size: 45px;
//   cursor: pointer;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const HamburgerLink = styled.div`
//   display: flex;
//   position: absolute;
//   z-index: 5;
//   background-color: var(--green-current);
//   width: 30vw;
//   height: 30vh;
//   align-items: center;
//   transition: 0.5s ease-in-out;
//   top: ${({ state }) => (state ? "80px" : "-400px")};

//   ul {
//     width: 100%;
//     list-style-type: none;
//     position: absolute;
//     top: 0;
//     li {
//       width: 100%;
//       min-width: 150px;
//       margin: 1rem 0;
//       margin-left: 2rem;
//       a {
//         text-decoration: none;
//         color: white;
//         font-size: 1.2rem;

//         transition: 0ms.1s ease-in-out;
//         &:hover {
//           color: var(--purple-lilac);
//         }
//       }
//       &:first-of-type {
//         a {
//           color: var(--purple-lilac);
//           font-weight: 900;
//         }
//       }
//     }
//   }

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;
