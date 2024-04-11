import React from "react";
import * as S from "../styles/ProductAddStyle";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <S.Nav className="nav">
      <Link to="/">
        <p>FreshTrash</p>
      </Link>
    </S.Nav>
  );
};

export default Nav;
