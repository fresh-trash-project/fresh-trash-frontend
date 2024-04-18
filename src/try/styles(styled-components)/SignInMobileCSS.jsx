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
    top: 0;
    width: 100%;
    height: 80%;
    transition: all 0.6s ease-in-out;

    form {
      border-radius: 0 0 40px 40px;
      background-color: lightgray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 40px;
      height: 100%;

      .logo {
        position: relative;
        bottom: 10%;
        right: 50%;
      }

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

      span {
        color: gray;
        position: relative;
        bottom: 3%;
        left: 40%;
        cursor: pointer;
        @media screen and (max-width: 400px) {
          font-size: 12px;
        }
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
    margin-top: 10px;
    position: relative;
    top: 7rem;
  }

  .sns-icons {
    margin: 20px 0;
    position: relative;
    top: 7rem;
    a {
      all: unset;
      cursor: pointer;
      color: var(--blue-grey);
      font-size: 30px;
      margin: 3px 15px 3px 10px;
      border: 1px solid var(--blue-grey);
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;

      .naver {
        font-size: 26px;
      }
    }
  }

  h1 {
    width: 80%;
    font-size: 1.4rem;
    position: relative;
    top: 1rem;
    left: 20vw;
    color: grey;
    .bold {
      font-weight: bold;
    }
  }

  .switch {
    display: flex;
    justify-content: center;
    position: relative;
    bottom: -10%;

    p {
      color: var(--blue-grey);
    }
    button {
      position: relative;
      left: 0.5rem;
      top: -1rem;
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
  font-size: 20px;
  position: relative;
  left: 50%;
  bottom: 8%;
  cursor: pointer;
  background-color: var(--white-ivory);
  border-radius: 50%;
`;
