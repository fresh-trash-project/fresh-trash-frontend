import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

export const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .profile-img-container {
    display: flex;
    flex-direction: column;

    .profile-img {
      width: 300px;
      height: 300px;
      max-width: 300px;
      max-height: 300px;
      overflow: hidden;
      border: 1px solid black;
      border-radius: 50%;
      margin-top: 2%;
      display: flex;
      align-items: end;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .img-input {
      cursor: pointer;
      position: relative;
      top: -50px;
      left: 60px;
    }

    .delete-button {
      background-color: var(--green-olive);
      margin-left: 10px;
      font-size: 14px;
      border-radius: 40px;
      cursor: pointer;
      padding: 1.5% 2%;

      @media screen and (max-width: 768px) {
        font-size: 11px;
      }
    }
  }

  .user-info {
    margin-left: 5%;
    margin-top: 50px;
    width: 50%;

    input {
      outline: none;
      margin-bottom: 3%;
      padding: 2%;
      font-size: 18px;
      border: 1px solid var(--blue-grey);
      border-radius: 40px;
    }
    .user-name-input {
      width: 40%;
      margin-bottom: 0;
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }

    .duplication-message {
      margin-left: 10px;
      color: blue;
    }

    .error {
      color: red;
    }

    .edit-button {
      background-color: var(--white-ivory);

      color: black;
      margin-left: 10px;
      font-size: 14px;
      border-radius: 40px;
      cursor: pointer;
      padding: 1.5% 2%;

      @media screen and (max-width: 768px) {
        font-size: 11px;
      }
    }

    .address-input {
      width: 80%;
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }

    .addr2 {
      margin-bottom: 70px;
    }
  }

  .edit-profile-button {
    cursor: pointer;
    padding: 1.5% 2%;
    font-size: 1.2em;
    border-radius: 10px;
    border: 1px solid transparent;
    background-color: var(--green-current);
    color: white;
    @media screen and (max-width: 768px) {
      font-size: 13px;
    }
  }

  .edit-profile-button:disabled {
    background-color: grey;
  }
`;

export const Bell = styled(FaBell)`
  width: 5%;
  height: 5%;
  color: var(--yellow-naples);
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  div {
    display: flex;
    width: 80vw;
    justify-content: space-between;

    .my-rating {
      display: flex;
      justify-content: center;
      font-size: 1.2rem;
      padding: 5px;
      margin-bottom: 30px;
      width: 8%;
      border: 1px solid transparent;
      border-radius: 10px;
      background-color: var(--white-ivory);
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
    .rating-value {
      width: 30px;

      display: flex;
      justify-content: center;
      font-size: 1.2rem;
      padding: 5px;
      margin-bottom: 30px;
      width: 8%;
      border: 1px solid transparent;
      border-radius: 10px;
      background-color: var(--white-ivory);
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
  }
`;

export const RatingBar = styled.div`
  width: 80vw;
  height: 5vh;
  border-radius: 40px;
  background: linear-gradient(
    45deg,
    var(--green-light),
    var(--green-dgreen),
    var(--green-aura),
    var(--green-cyan),
    var(--green-current),
    var(--green-brunswick),
    var(--green-poly)
  );
`;

export const FootStep = styled(IoFootsteps)`
  color: var(--yellow-saffron);
  transform: rotate(90deg);
  width: 50px;
  height: 50px;
  position: relative;
  top: -50px;
`;

export const MyList = styled.div`
  width: 100%;
  height: 60vh;
  .lists {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70%;

    @media screen and (max-width: 580px) {
      flex-direction: column;
      align-items: center;
    }

    .my-trade-list {
      border: 1px solid black;
      width: 40%;
      height: 100%;
      border-radius: 5px;
      margin-right: 10%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-bottom: 30px;
        width: auto;
        height: 10%;
        font-size: 20px;
      }
      @media screen and (max-width: 580px) {
        margin-right: 0;
        margin-bottom: 50px;
        p {
          font-size: 1rem;
        }
      }
    }
    .my-auction-list {
      border-radius: 5px;
      border: 1px solid black;
      width: 40%;
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-bottom: 30px;
        width: auto;
        height: 10%;
        font-size: 20px;
      }
      @media screen and (max-width: 580px) {
        p {
          font-size: 1rem;
        }
      }
    }
  }
  .likes {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    width: 100%;
    height: 70%;
    @media screen and (max-width: 580px) {
      flex-direction: column;
      align-items: center;
      justify-content: start;
      height: auto;
    }

    .my-likes {
      border: 1px solid black;
      width: 40%;
      height: 100%;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-bottom: 30px;
        width: auto;
        height: 10%;
        font-size: 20px;
      }
      @media screen and (max-width: 580px) {
        p {
          font-size: 1rem;
        }
      }
    }
  }

  .click {
    all: unset;
    cursor: pointer;
    width: 60%;
    height: 60%;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background-color: var(--purple-lilac);
    &:hover {
      filter: brightness(60%);
      p {
        scale: 1.5;
      }
    }
  }
`;

export const Heart = styled(IoHeart)`
  color: var(--red-tomato);
  margin-left: 10px;
  font-size: 150%;
`;
