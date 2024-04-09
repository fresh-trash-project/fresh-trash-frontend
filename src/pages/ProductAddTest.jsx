import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { FaWonSign } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import * as S from "../styles/ProductAddStyle";
import { Link } from "react-router-dom";
import { postsState } from "../recoil/RecoilWastes";
import { createPost } from "../api/WastesApi";
import { IoIosCamera } from "react-icons/io";
import axios from "axios";
const ProductAdd = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [waste_category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [waste_status, setWasteStatus] = useState("");
  const [content, setContent] = useState("");
  const [sell_status, setSell] = useState("");
  const [waste_price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);

  const handleComplete = (data) => {
    setAddress(data.address);
    // new Window.close();
  };

  const handleOpenAddressModal = () => {
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setImagePreview(reader.result);
    // };
    // reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", img);
    formData.append("category", waste_category);
    formData.append("title", title);
    formData.append("waste_status", waste_status);
    formData.append("sell_status", sell_status);
    formData.append("waste_price", waste_price);
    formData.append("content", content);
    formData.append("address", address);

    try {
      const response = await axios.post(
        "http://localhost:3000/wastes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("응답 데이터:", response.data);
      const newPost = {
        img: response.data.imagePath,
        title,
        waste_category,
        waste_status,
        sell_status,
        waste_price,
        content,
        address,
      };
      const createdPost = await createPost(newPost);
      setPosts([...posts, createdPost]);

      setCategory("");
      setTitle("");
      setWasteStatus("");
      setContent("");
      setSell("");
      setPrice("");
      setAddress("");
      setImg(null);
      // setImagePreview(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <S.Nav className="nav">
        <Link to="/">
          <p>FreshTrash</p>
        </Link>
      </S.Nav>
      <S.Container>
        <div className="subject">
          <IoIosArrowForward />
          <span>폐기물 등록</span>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="img">
            <label htmlFor="img" className="imgButton">
              <IoIosCamera size="80" />
              <input
                type="file"
                id="img"
                name="img"
                accept="img/*"
                onChange={handleImageChange}
                // onChange={(e) => setImg(e.target.files[0])}
                required
              />

              {img && (
                <img
                  src={img && URL.createObjectURL(img)}
                  alt="게시물 이미지"
                  className="AttachedImage"
                />
              )}
              {/* {imagePreview && (
                <img
                  // src={imagePreview}
                  src={img && URL.createObjectURL(img)}
                  alt="이미지 미리보기"
                  className="AttachedImage"
                />
              )} */}
            </label>
          </div>
          <div className="box category">
            <label htmlFor="waste_category" className="formTitle">
              카테고리
            </label>
            <select
              // id="waste_category"
              name="waste_category"
              value={waste_category}
              onChange={(e) => setCategory(e.target.value)}
              // onChange={handleInputChange}
              required
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="전자기기">전자기기</option>
              <option value="의류">의류</option>
              <option value="생활/주방">생활/주방</option>
              <option value="뷰티">뷰티</option>
              <option value="건강">건강</option>
              <option value="스포츠">스포츠</option>
              <option value="도서">도서</option>
              <option value="장난감/게임">장난감/게임</option>
              <option value="가구/인텔어">가구/인테리어</option>
              <option value="반려동물용품">반려동물용품</option>
              <option value="식물">식물</option>
            </select>
          </div>
          <div className="box title">
            <label htmlFor="title" className="formTitle">
              제목
            </label>
            <input
              type="text"
              // id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // onChange={handleInputChange}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div className="box state">
            <div className=" formTitle">폐기물 상태</div>
            <label htmlFor="best">최상</label>
            <input
              type="radio"
              // id="best"
              name="waste_status"
              value="최상"
              checked={waste_status === "최상"}
              onChange={(e) => setWasteStatus(e.target.value)}
              // checked={newPost.waste_status === "최상"}
              // onChange={handleInputChange}
              required
            />
            <label htmlFor="good">상</label>
            <input
              type="radio"
              // id="good"
              name="waste_status"
              value="상"
              checked={waste_status === "상"}
              onChange={(e) => setWasteStatus(e.target.value)}
              // checked={newPost.waste_status === "상"}
              // onChange={handleInputChange}
            />
            <label htmlFor="average">중</label>
            <input
              type="radio"
              // id="average"
              name="waste_status"
              value="중"
              checked={waste_status === "중"}
              onChange={(e) => setWasteStatus(e.target.value)}
              // checked={newPost.waste_status === "중"}
              // onChange={handleInputChange}
            />
            <label htmlFor="poor">하</label>
            <input
              type="radio"
              // id="poor"
              name="waste_status"
              value="하"
              checked={waste_status === "하"}
              onChange={(e) => setWasteStatus(e.target.value)}
              // checked={newPost.waste_status === "하"}
              // onChange={handleInputChange}
            />
            <label htmlFor="worst">최하</label>
            <input
              type="radio"
              // id="worst"
              name="waste_status"
              value="최하"
              checked={waste_status === "최하"}
              onChange={(e) => setWasteStatus(e.target.value)}
              // checked={newPost.waste_status === "최하"}
              // onChange={handleInputChange}
            />
          </div>
          <div className="box Dropdown">
            <label htmlFor="sell_status" className="formTitle">
              거래상태
            </label>
            <select
              // id="sell_status"
              name="sell_status"
              // value={newPost.sell_status}
              // onChange={handleInputChange}
              value={sell_status}
              onChange={(e) => setSell(e.target.value)}
              required
            >
              <option value="">선택하세요</option>
              <option value="거래중">거래중</option>
              <option value="거래완료">거래완료</option>
            </select>
          </div>
          {waste_price === "0" ? (
            <div className="box price">
              <label htmlFor="waste_price" className="formTitle inputNone">
                나눔
              </label>
              <input
                type="number"
                // id="waste_price"
                name="waste_price"
                value={waste_price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="제안 가격을 입력해주세요."
                className="inputNone"
                min="0"
                required
              />
              <FaWonSign size="15" className="inputNone" />
            </div>
          ) : (
            <div className="box price">
              <label htmlFor="waste_price" className="formTitle">
                가격
              </label>
              <input
                type="number"
                // id="waste_price"
                name="waste_price"
                value={waste_price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="제안 가격을 입력해주세요."
                min="0"
                required
              />
              <FaWonSign size="15" />
            </div>
          )}

          <div className="box content">
            <label htmlFor="content" className="formTitle">
              설명
            </label>
            <br />
            <textarea
              // id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              cols="50"
              required
              placeholder="설명을 입력해주세요."
            ></textarea>
          </div>
          <div className="box address">
            <label htmlFor="address" className="formTitle">
              주소
            </label>
            <input
              type="text"
              value={address}
              placeholder="주소/위치를 입력해주세요."
              required
              readOnly
            />
            <button type="button" onClick={handleOpenAddressModal}>
              주소 검색
            </button>
            {/* {isAddressModalOpen && <DaumPostcode onComplete={handleComplete} />} */}
          </div>

          <button type="submit">작성</button>
        </form>
      </S.Container>
    </div>
  );
};

export default ProductAdd;
