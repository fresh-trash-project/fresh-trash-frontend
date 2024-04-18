import styled from 'styled-components';

export const Container = styled.div`
  /* display: grid;
  grid-template-columns: 20rem 20rem 20rem;
  gap: 70px;
  justify-content: center; */
  .card {
    border: 1px solid var(--grey-box);
    padding: 1.5rem;
    box-sizing: border-box;
    box-shadow: 5px 5px 8px var(--grey-box);
    border-radius: 10px;
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
      gap: 1rem;
      font-size: 1.5rem;
      .like {
        display: flex;

        gap: 0.3rem;
        button {
          border: none;
          background-color: white;
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: 1280px) {
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
`;
