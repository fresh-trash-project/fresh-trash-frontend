import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
// import Nav from '../components/Nav';
import AddForm from '../components/Product/AddForm';
import { FaWonSign } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import * as S from '../styles/ProductAddStyle';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { postsState } from '../recoil/RecoilWastes';
import { createPost } from '../api/WastesApi';
import { IoIosCamera } from 'react-icons/io';
import Nav from '../components/Nav';
import axios from 'axios';
const ProductAdd = () => {
  return (
    <div>
      <Nav />
      <AddForm />
    </div>
  );
};
export default ProductAdd;
