import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";

export const Nav = styled.nav`
  width: 100%;
  height: 80px;
  background-color: var(--green-current);
  display: flex;
  /* flex-direction: column; */

  .logo img {
    max-width: 60px;
    margin: 10px;
    height: auto;
  }
  .navLeft {
    flex: 70%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5%;
    color: white;
    a {
      color: white;
      font-size: x-large;
      text-decoration: none;
      margin: 10px;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }
  .navRight {
    flex: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;
    color: var(--white);

    a {
      color: white;
      font-size: large;
      text-decoration: none;
      margin: 5px;
      width: 100px;
      @media (max-width: 580px) {
        font-size: 15px;
      }
    }
  }
`;

export const Hamburger = styled(AiOutlineMenu)`
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Close = styled(VscChromeClose)`
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const HamburgerLink = styled.div`
  display: flex;
  position: absolute;
  z-index: 5;
  background-color: var(--green-current);
  width: 40vw;
  height: 30vh;
  align-items: center;
  transition: 0.3s ease-in-out;
  top: ${({ state }) => (state ? "80px" : "-400px")};
  border-radius: 0 0 10% 10%;

  .white-background {
    width: 25%;
    height: 100%;
    background-color: var(--white-ivory);
  }

  ul {
    width: 100%;
    list-style-type: none;
    position: absolute;
    top: 0;
    border-top: 1px solid var(--white-ivory);
    li {
      width: 100%;

      margin: 1rem 0;
      margin-left: 35%;

      a {
        text-decoration: none;
        color: white;
        font-size: 1.2rem;

        transition: 0ms.1s ease-in-out;
        &:hover {
          color: var(--purple-lilac);
        }
        @media (max-width: 580px) {
          font-size: 15px;
        }
      }
      &:first-of-type {
        a {
          color: var(--purple-lilac);
          font-weight: 900;
        }
      }
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
