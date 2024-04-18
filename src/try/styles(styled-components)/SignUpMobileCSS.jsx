import styled from "styled-components";
import { VscEye } from "react-icons/vsc";

export const Mobile = styled.div`
  height: 90vh;
  width: 100%;
  background-color: var(--white-ivory);
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;

  .form-container {
    position: absolute;
    top: 160px;
    width: 100%;
    height: 80%;

    .logo {
      position: relative;
      top: -20%;
      left: 3%;
    }

    h1 {
      width: 80%;
      font-size: 1.4rem;
      position: relative;
      top: -5rem;
      left: 1rem;
      color: grey;
      .bold {
        position: relative;
        right: -3%;
        font-weight: bold;
        color: grey;
      }
    }

    form {
      border-radius: 40px 40px 0px 0px;
      background-color: lightgray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 0 40px;
      height: 100%;

      input {
        background-color: white;
        border: none;
        margin: 8px 0;
        padding: 20px 15px;
        font-size: 20px;
        border-radius: 8px;
        width: 100%;
        outline: none;
      }

      .password {
        position: relative;
        top: -15px;
      }

      .input-button {
        cursor: pointer;
        background-color: var(--white-ivory);
        color: black;
        font-size: 12px;
        padding: 5px;
        border-radius: 40%;
        margin: 0;
        width: auto;
        height: auto;
      }

      .email-button {
        position: relative;
        top: -8%;
        left: 48%;
      }

      .user-name-button {
        position: relative;
        top: -10%;
        left: 48%;
        height: 7%;
      }
    }
  }

  button {
    cursor: pointer;
    background-color: var(--green-current);
    color: white;
    font-size: 30px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-top: 80px;
  }

  .switch {
    display: flex;
    justify-content: center;
    p {
      position: relative;
      bottom: 20%;
      color: var(--blue-grey);
    }
    button {
      position: relative;
      left: 10%;
      top: -98%;
      padding: 0.5rem;
      background-color: var(--green-olive);
      border-radius: 40px;
      font-size: 0.7rem;
      font-weight: normal;
      cursor: pointer;
      &:hover {
        background-color: var(--purple-dpurple);
      }
    }
  }
`;

export const EyeIcon = styled(VscEye)`
  font-size: 10px;
  position: relative;
  left: 48%;
  bottom: 10%;
  cursor: pointer;
  background-color: var(--white-ivory);
  border-radius: 40%;
  width: 9%;
  height: 4%;
`;
