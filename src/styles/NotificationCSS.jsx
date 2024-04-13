import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import { IoMdArrowForward, IoMdClose } from "react-icons/io";

export const Bell = styled(FaBell)`
  width: 5%;
  height: 5%;
  color: var(--yellow-naples);
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const NotificationContainer = styled.div`
  width: 100%;
`;

export const Sidebar = styled.div`
  background-color: white;
  width: 35vw;
  max-width: 35vw;
  height: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all;
  transition-duration: 300ms;
  z-index: 20;
  padding: 35px;

  @media screen and (max-width: 580px) {
    width: 100vw;
    max-width: 100vw;
    padding: 1rem;
  }
`;

export const Close = styled(IoMdClose)``;
export const Arrow = styled(IoMdArrowForward)``;
