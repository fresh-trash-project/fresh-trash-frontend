import styled from "styled-components";

export const Carousel = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
  }

  .left-button {
    all: unset;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 40%;
    width: auto;
    padding: 16px;
    font-size: 40px;
    fill: white;
    transition: 0.6s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  .right-button {
    all: unset;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 40%;
    width: auto;
    padding: 16px;
    font-size: 40px;
    fill: white;
    transition: 0.6s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
  .dot-container {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    .dot {
      cursor: pointer;
      height: 30px;
      width: 30px;
      margin: 0 2px;
      color: white;
      transition: 0.6 ease;
      &:hover {
        color: var(--green-light);
      }
    }

    @media only screen and (max-width: 768px) {
      .dot {
        width: 25px;
        height: 25px;
      }
    }
  }
`;
