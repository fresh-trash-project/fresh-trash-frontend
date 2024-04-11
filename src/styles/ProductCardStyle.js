import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 20rem 20rem 20rem;
  gap: 70px;
  justify-content: center;
  .card {
    border: 1px solid var(--grey-box);
    padding: 1.5rem;
    box-sizing: border-box;
    .product-box {
      display: flex;
      flex-direction: column;
      img {
        margin-bottom: 2rem;
      }
      .title {
        margin-bottom: 1.5rem;
        font-size: 1.3rem;
      }
      .content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.5rem;
        .adrress {
          display: flex;
          .state {
            margin-right: 0.5rem;
          }
          .city {
            margin-right: 3rem;
          }
        }
        .day {
          display: flex;
          .created-at {
            margin-left: 0.5rem;
            line-height: 1rem;
          }
        }
      }
      .price {
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
    .card-bottom {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1.5rem;
      font-size: 1.5rem;
      p {
      }
    }
  }
  /* @media (max-width: 1440px) {
    display: grid;
    grid-template-columns: 22rem 22rem 22rem;
    gap: 50px;
    justify-content: center;
    .card {
      padding: 1.5em;
      .product-box {
        display: flex;
        flex-direction: cloumn;
      }
      .sell-status {
        float: right;
        font-size: 1.5rem;
      }
    }
  } */
  @media (max-width: 1280px) {
    display: grid;
    grid-template-columns: 19rem 19rem 19rem;
    gap: 40px;
    justify-content: center;
    .card {
      .product-box {
        display: flex;
        flex-direction: cloumn;
        .content {
          .adrress {
            .state {
              margin-right: 0.1rem;
            }
            .city {
              margin-right: 3rem;
            }
          }
          .day {
            .created-at {
              margin-left: 0.5rem;
              line-height: 1rem;
            }
          }
        }
        .price {
          font-size: 1.2rem;
          font-weight: bold;
        }
      }
      .sell-status {
        font-size: 1.4rem;
      }
    }
  }
  @media (max-width: 1080px) {
    display: grid;
    grid-template-columns: 40rem;
    gap: 70px;
    .card {
      border-bottom: 1px solid var(--grey-box);
      .product-box {
        display: flex;
        flex-direction: row;
        img {
          margin-right: 3rem;
        }
        .title {
          margin-bottom: 1.3rem;
          font-size: 1.3rem;
        }
        .content {
          .adrress {
            .state {
              font-size: 1rem;
            }
            .city {
              font-size: 1rem;
            }
          }
          .day {
            .created-at {
              font-size: 1rem;
              line-height: 1rem;
            }
          }
        }
        .price {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
      .sell-status {
        float: right;
        font-size: 1.5rem;
      }
    }
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 35rem;
    gap: 70px;
    .card {
      border-bottom: 1px solid var(--grey-box);
      .product-box {
        display: flex;
        flex-direction: row;
        img {
          margin-right: 3rem;
          width: 200px;
        }
        .title {
          margin-bottom: 1.3rem;
          font-size: 1.3rem;
        }
        .content {
          .adrress {
            .state {
              font-size: 1rem;
            }
            .city {
              font-size: 1rem;
            }
          }
          .day {
            .created-at {
              font-size: 1rem;
              line-height: 1rem;
            }
          }
        }
        .price {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
      .sell-status {
        float: right;
        font-size: 1.5rem;
      }
    }
  }
  /* @media (max-width: 1280px) {
    width: 62rem;
  }
  @media (max-width: 1024px) {
    width: 50rem;
  }
  @media (max-width: 768px) {
    width: 40rem;
     font-size: 0.88rem; 
  } */
`;
