import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: var(--blue-grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .sns-icon-container {
    width: 35%;
    /* border: 1px solid white; */
    height: auto;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 15px;

    .sns-icon {
      width: 6%;
      height: 30px;
      background-color: white;
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .footer-text-container {
    cursor: pointer;
    width: 40%;
    /* background-color: black; */
    display: flex;
    justify-content: space-between;
    color: white;
    position: absolute;
    bottom: 50px;
  }
  .contact {
    &:hover {
      color: var(--green-light);
      font-weight: 900;
    }
  }

  .contact-clicked {
    transform: scale(1.1);
    border: 2px solid;
    border-color: var(--green-light);
    transition: 0.3 ease-in-out;
  }

  .copy-right {
    width: 100%;
    height: 40px;
    background-color: var(--grey-dark);
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: white;
    }
  }
`;
