import styled from "styled-components";
import { VscEye } from "react-icons/vsc";

export const Container = styled.div`
  height: 100vh;
  background-color: var(--purple-lilac);
  background: linear-gradient(
    45deg,
    var(--purple-dpurple),
    var(--purple-soft),
    var(--purple-lilac)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SignInContainer = styled.div`
  position: relative;
  width: 800px;
  max-width: 100%;
  height: 650px;
  background-color: var(--white-ivory);
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  overflow: hidden;

  .text {
    width: 30%;
    transform: translateX(240%);
    p {
      font-size: 20px;
      font-weight: 500;
      width: 200px;
      height: auto;
      margin-right: 10%;
      margin-top: 20px;
      padding-left: 40%;

      @media screen and (max-width: 786px) {
        font-size: 14px;
        transition: 0.3s ease-in-out;
      }
    }
    .bold {
      width: 200px;
      font-weight: 900;
      font-size: x-large;
      margin-right: 25%;
      margin-top: 5px;
      @media screen and (max-width: 786px) {
        font-size: 16px;
        transition: 0.3s ease-in-out;
      }
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
    transform: translateX(-43%);

    h1 {
      font-size: xxx-large;
      font-weight: 700;
      position: absolute;
      top: 20px;

      transform: translateX(50%);
      @media screen and (max-width: 786px) {
        font-size: 40px;
        transition: 0.3s ease-in-out;
      }
    }
    .email {
      width: 70%;
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
    .password {
      margin-top: 80px;
      width: 70%;
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

      a {
        text-decoration: none;
        color: gray;
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 90px;
        &:hover {
          color: var(--purple-dpurple);
        }
      }
    }

    .button-signin {
      position: absolute;
      width: 40%;
      top: 78%;
      right: 7%;

      button {
        width: 100%;
        height: auto;
        background-color: var(--green-current);
        color: white;
        font-size: 25px;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding: 7% 1%;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transform: translateX(-94%);
      }
    }

    .toggle-to-signin {
      position: absolute;
      width: 50%;
      right: 5%;
      top: 90%;
      transform: translateX(-60%);
      /* 이부분이 반응형으로 잘 안됨 */

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

export const Logo = styled.div`
  display: flex;
  justify-content: end;
  img {
    width: 70px;
    height: auto;
    margin: 20px;
  }
`;

export const EyeIcon = styled(VscEye)`
  font-size: 20px;
`;

export const Drawing = styled.div`
  position: absolute;
  top: 55%;
  left: 20px;
  width: 43%;
  height: 40%;
  border-radius: 200px;
  background-color: var(--green-current);
  z-index: 2;
  transform: translateX(120%);

  p {
    font-size: xx-large;
    color: white;
    font-weight: 600;
    position: absolute;
    top: 10%;
    left: 13%;
    @media screen and (max-width: 786px) {
      font-size: 23px;
      transition: 0.3s ease-in-out;
    }
  }

  .trash-bin {
    position: absolute;
    top: 100px;
    left: 40px;
    width: 32%;
    height: auto;
  }

  .recycle {
    position: absolute;
    top: 130px;
    left: 60px;
    color: var(--green-light);
    width: 20%;
    height: auto;
  }

  .leaf {
    position: absolute;
    top: 80px;
    left: 120px;
    color: var(--green-light);
    width: 15%;
    height: auto;
  }

  .dollar {
    position: absolute;
    top: 80px;
    right: 30px;
    color: var(--yellow-saffron);
    width: 15%;
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

export const SNSIcons = styled.i`
  position: absolute;
  bottom: 12px;
  /* transform: translateX(-168%); */
  margin-left: 35%;
  display: flex;
  align-items: center;
  width: 100%;

  a {
    border-radius: 50%;
    width: 5%;
    height: 20%;
    margin: 15px;
    padding-bottom: 10px;

    .naver {
      /* color: rgb(3, 199, 90); */
      width: 80%;
      height: 80%;
    }
    .kakao {
      /* color: rgb(255, 232, 18);
      background-color: black; */
      width: 110%;
      height: 110%;
    }
    .google {
      width: 100%;
      height: 100%;
    }
  }
`;
