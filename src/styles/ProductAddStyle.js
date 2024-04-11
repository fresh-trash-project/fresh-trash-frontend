import styled from "styled-components";
export const Nav = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid var(--grey-box);
  padding: 15px 0;
  background-color: var(--green-brunswick);
  p {
    margin: 0 10px;
    color: white;
  }
`;
export const Container = styled.div`
  width: 50rem;
  margin: 0 auto;
  box-sizing: border-box;
  .subject {
    margin: 15px 0;
  }
  .box {
    padding: 15px 0;
    border-top: 1px solid var(--grey-box);
  }
  .drop-down {
    display: flex;
    justify-content: space-between;
  }

  .content,
  .address,
  .price,
  .title,
  .state,
  .category {
    display: flex;
    align-items: center;
  }
  .img {
    display: flex;
    align-items: flex-end;
    padding: 15px 0;
  }
  select#category {
    margin-right: 3%;
    float: right;
  }

  .form-title {
    margin: 0 10px;
    width: 20%;
    font-weight: bold;
  }
  select {
    border: none;
    outline: none;
  }
  input,
  textarea {
    border: none;
    outline: none;
  }
  input#price {
    margin-right: 3%;
  }
  textarea {
    width: 25rem;
  }
  .img-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 200px;
    height: 200px;
    background-color: var(--grey-box);
    border-radius: 7px;
  }

  input[type="file"] {
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  .attached-image {
    max-width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 7px;
  }
  /* .imgEdit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 2.5rem;
    background-color: var(--green-brunswick);
    border-radius: 5px;
    margin-left: 10%;
    cursor: pointer;

    color: white;
  } */
  input[type="text"],
  input[type="number"] {
    width: 75%;
    height: 1.5rem;
  }
  input:focus::-webkit-input-placeholder,
  textarea:focus::-webkit-input-placeholder {
    color: transparent;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .input-none {
    display: flex;
    opacity: 0.3;
  }
  button {
    float: right;
    width: 5rem;
    height: 2.5rem;
    border: none;
    border-radius: 5px;
    background-color: var(--green-brunswick);
    cursor: pointer;
    color: white;
  }
  @media (max-width: 1024px) {
    width: 40rem;
  }
  @media (max-width: 768px) {
    width: 30rem;
    font-size: 0.88rem;
  }
`;
