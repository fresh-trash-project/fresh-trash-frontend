import styled from "styled-components";
export const Nav = styled.div`
  .nav-middle {
    display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    border-bottom: 1px solid var(--grey-box);
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
        }
        input {
          width: 15rem;
          height: 2rem;
          border: none;
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
  .nav-bottom {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 1rem;
    margin-bottom: 2rem;
    span {
      margin-right: 1rem;
    }
  }
`;
export const CardList = styled.div``;
