import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

export const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .profile-img {
    width: 200px;
    height: 200px;
    border: 1px solid blue;
    border-radius: 50%;
    margin-top: 2%;
    img {
    }
  }

  .user-info {
    margin-left: 5%;
    margin-top: 40px;
    width: 40%;

    input {
      outline: none;
      margin-bottom: 3%;
      padding: 2%;
      font-size: 18px;
      border: 1px solid var(--blue-grey);
      border-radius: 40px;
    }
    .user-name-input {
      width: 50%;
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
    .address-input {
      width: 100%;
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
  }

  button {
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
`;

export const Bell = styled(FaBell)`
  width: 5%;
  height: 5%;
  color: var(--yellow-naples);
  position: absolute;
  top: 0;
  right: 0;
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
  .lists {
    display: flex;
    justify-content: center;
    width: 100%;

    .my-trade-list {
      border: 1px solid blue;
      width: 40%;
      border-radius: 5px;
      margin-right: 10%;
      padding: 10px;
      height: 300px;
      display: flex;
      justify-content: center;
      p {
        margin: 0;
        width: auto;
        height: 10%;
      }
    }
    .my-auction-list {
      border-radius: 5px;
      border: 1px solid blue;
      width: 40%;
      padding: 10px;
      height: 300px;
      display: flex;
      justify-content: center;
      p {
        margin: 0;
        width: auto;
        height: 10%;
      }
    }
  }
  .likes {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .my-likes {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      border: 1px solid blue;
      width: 40%;
      height: 300px;
      padding: 10px;
      p {
        margin: 0;
        width: auto;
        height: 10%;
      }
    }
  }
`;

export const Heart = styled(IoHeart)`
  color: var(--red-tomato);
`;
