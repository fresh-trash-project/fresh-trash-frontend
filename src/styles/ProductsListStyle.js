import styled from "styled-components";
export const Nav = styled.div`
  .nav-middle {
    display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    border-bottom: 1px solid var(--grey-box);
    box-shadow: 0px 3px 8px var(--grey-box);
    .nav-left {
      position: relative;
      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: none;
        border-radius: 5px;
        width: 6rem;
        height: 2.8rem;
        background-color: var(--green-brunswick);
        cursor: pointer;
        p {
          color: white;
        }
      }
    }
    .nav-middle-right {
      display: flex;
      gap: 2rem;
      align-items: center;
      .search-wrapper {
        position: relative;
        border: 2px solid black;
        border-radius: 5px;
        .search-category {
          width: 5rem;
          height: 2.2rem;
          background-color: white;
          border-radius: 5px;
          border: none;
          outline: none;
        }
        input {
          width: 15rem;
          height: 1rem;
          border: none;
          outline: none;
        }
        .search-icon {
          position: absolute; /* 아이콘을 절대적으로 위치시킵니다. */
          top: 0;
          right: 0;
          margin-top: 0.4rem; /* 원하는 위치로 조정하세요 */
          margin-right: 0.5rem;
        }
      }
    }
  }
  @media (max-width: 1080px) {
    .nav-middle {
      display: flex;
      padding: 1rem 1rem;
      justify-content: space-between;
      border-bottom: 1px solid var(--grey-box);
      box-shadow: 0px 3px 8px var(--grey-box);
      .nav-left {
        position: relative;
        button {
          display: flex;
          justify-content: center;
          border: none;
          border-radius: 5px;
          width: 2.5rem;
          height: 2.8rem;

          cursor: pointer;
          p {
            display: none;
          }
        }
      }
      .nav-middle-right {
        display: flex;
        gap: 2rem;
        align-items: center;
        .search-wrapper {
          position: relative;
          border: 2px solid black;
          border-radius: 5px;
          .search-category {
            width: 5rem;
            height: 2.2rem;
            background-color: white;
            border-radius: 5px;
            border: none;
            outline: none;
          }
          input {
            width: 15rem;
            height: 1rem;
            border: none;
            outline: none;
          }
          .search-icon {
            position: absolute; /* 아이콘을 절대적으로 위치시킵니다. */
            top: 0;
            right: 0;
            margin-top: 0.4rem; /* 원하는 위치로 조정하세요 */
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
`;
export const Category1 = styled.div`
  position: relative;
  .modal {
    position: absolute;
    background-color: white;
    box-shadow: 2px 2px 2px var(--grey-box);
    border: 1px solid var(--grey-box);
    /* padding: 2rem; */
    width: 15rem;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;

      li {
        width: 100%;
        height: 2.5rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      li:hover {
        background-color: var(--grey-light);
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background-color: white;
    border: none;
    margin-top: 1rem;
    margin-right: 1rem;
    cursor: pointer;

    font-size: 1rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  button {
    background-color: white;
    border: 1px solid var(--grey-box);
    width: 2.5rem;
    height: 2rem;
    cursor: pointer;
  }
`;
export const Card = styled.div`
  display: grid;
  grid-template-columns: 20rem 20rem 20rem;
  gap: 70px;
  justify-content: center;
  margin: 3rem 0;

  @media (max-width: 1280px) {
    display: grid;
    grid-template-columns: 19rem 19rem 19rem;
    gap: 40px;
    justify-content: center;
  }
  @media (max-width: 1080px) {
    display: grid;
    grid-template-columns: 40rem;
    gap: 70px;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 30rem;
    gap: 70px;
  }
`;
