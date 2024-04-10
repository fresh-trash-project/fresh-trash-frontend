import styled from "styled-components";
export const Nav = styled.div`
  .nav-middle {
    display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    border-bottom: 1px solid var(--grey-box);
  }
  .nav-bottom {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 1rem;
    span {
      margin-right: 1rem;
    }
  }
`;
export const Container = styled.div`
  /* display: flex; */
  border: 1px solid var(--grey-box);
  padding: 2.5em;
  width: 70rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  box-sizing: border-box;
  .product-box {
    display: flex;

    img {
      margin-right: 3rem;
    }
    .title {
      margin-bottom: 1.5rem;
    }
    .content {
      display: flex;
      margin-bottom: 1.5rem;
      .city {
        margin-right: 3rem;
      }
    }
    .price {
    }
  }
  .sell-status {
    float: right;
    font-size: 1.5rem;
  }
`;
