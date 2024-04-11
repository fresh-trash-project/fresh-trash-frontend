import styled from "styled-components";

export const HeroContainer = styled.div`
  /* max-width: 1200px; */
  width: 100%;
  height: 500px;
  margin: 0, auto;
`;

export const Headline = styled.div`
  width: 100%;
  min-height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-soft);

  h1 {
    font-size: 30px;
    font-weight: 400;
    color: white;
    padding: 10px;
    span {
      font-size: 60px;
      font-weight: 800;
      color: white;
    }
  }

  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 20px;
      transition: font-size 0.3s ease;
      span {
        font-size: 40px;
        transition: font-size 0.3s ease;
      }
    }
  }
`;

export const BodyCopy = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--green-tiffany);
  p {
    width: 50%;
    height: 80%;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;
  }
`;

export const ListSlide = styled.div`
  /* width: 100%; 이렇게 했을때 왜 화면 크기가 커지고 좌우스크롤바 생기는지 모르겠음*/
  background-color: var(--white-ivory);
  padding: 30px;
  height: 400px;
  border: 1px solid red;
  position: relative;
  section {
    width: 90%;
    height: 400px;
    margin: 0 auto;
    border: 1px solid;
    .slide-top {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.3rem;
      font-weight: 500;

      .slide-top-left {
        width: 55%;
        /* border: 1px solid blue; */
        padding-left: 2%;
        position: relative;

        .buy {
          width: auto;
          height: 30px;
          /* position: absolute;
          transform: rotate(-20deg); */
        }
        .sell {
          width: auto;
          height: 30px;
        }
        .share {
          /* background-color: aquamarine; */
          width: auto;
          height: 30px;
          position: absolute;
          top: -10px;
          left: 120px;
          transform: rotate(-10deg);
        }
      }

      .slide-top-right {
        padding-right: 1%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 30%;
        /* border: 1px solid blue; */
      }
    }

    .slide-content {
      width: 100%;
      height: 350px;
      border: 1px solid brown;
    }
  }

  \ .arrow-right {
    cursor: pointer;
    height: 6vw;
    width: 6vh;
    margin-left: 20px;
    position: absolute;
    top: 0vw;
    right: 2vw;
    fill: var(--blue-dblue);
    transition: transform 0.3s ease-in;
    &:hover {
      fill: var(--purple-dpurple);
      transform: scale(1.1);
    }
  }
`;
