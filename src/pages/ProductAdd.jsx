import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Nav from "../components/Nav";
import { FaWonSign } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import * as S from "../styles/ProductAddStyle";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { postsState } from "../recoil/RecoilWastes";
import { createPost } from "../api/WastesApi";
import { IoIosCamera } from "react-icons/io";
import axios from "axios";
const ProductAdd = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [wasteCategory, setWasteCategory] = useState("");
  const [title, setTitle] = useState("");
  const [wasteStatus, setWasteStatus] = useState("");
  const [content, setContent] = useState("");
  const [sellStatus, setSellStatus] = useState("");
  const [wastePrice, setWastePrice] = useState("");
  const [address, setAddress] = useState({
    zipcode: "",
    state: "",
    city: "",
    district: "",
    detail: "",
  });

  const [fileName, setFileName] = useState(null);
  const [likeCount, setLikeCount] = useState(70);
  const [viewCount, setViewCount] = useState(55);
  const navigate = useNavigate();

  //찾은 주소 inptu 반영
  const handleComplete = (data) => {
    setAddress({
      address: data.address,
      zipcode: data.zonecode,
      state: data.sido,
      city: data.sigungu,
      district: data.bname,
      detail: data.buildingName,
    });
  };
  //주소검색 버튼 클릭시 주소찾기 모달 창 open
  const handleOpenAddressModal = () => {
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };
  //이미지 형식 제한
  const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validImageTypes.includes(file.type)) {
        setFileName(file);
      } else {
        alert("올바른 이미지 형식을 선택하세요. (JPEG, JPG, PNG)");
        // 선택한 파일 초기화
        e.target.value = null;
      }
    }
  };

  //데이터 제출
  const handlePriceChange = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };

  //제목 글자수 제한
  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 255) {
      setTitle(inputValue);
    }
  };
  //내용 글자수 제한
  const handleContentChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 65535) {
      setContent(inputValue);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("category", wasteCategory);
    formData.append("title", title);
    formData.append("waste_status", wasteStatus);
    formData.append("sell_status", sellStatus);
    formData.append("waste_price", wastePrice);
    formData.append("content", content);
    formData.append("address", address);
    formData.append("likeCount", likeCount);
    formData.append("viewCount", viewCount);

    try {
      const newPost = {
        fileName,
        title,
        wasteCategory,
        wasteStatus,
        sellStatus,
        wastePrice,
        content,
        address,
        likeCount,
        viewCount,
        created_at: new Date().toLocaleDateString(),
      };
      const createdPost = await createPost(newPost);
      setPosts([...posts, createdPost]);

      setWasteCategory("");
      setTitle("");
      setWasteStatus("");
      setContent("");
      setSellStatus("");
      setWastePrice("");
      setAddress("");
      setFileName(null);

      navigate("/ProductsList");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <Nav />
      <S.Container>
        <div className="subject">
          <IoIosArrowForward />
          <span>폐기물 등록</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="img">
            <label htmlFor="img" className="img-button">
              <IoIosCamera size="80" />
              <input
                type="file"
                id="img"
                name="img"
                accept="image/png, image/jpeg, imge/jpg"
                onChange={handleImageChange}
                required
              />

              {fileName && (
                <img
                  src={fileName && URL.createObjectURL(fileName)}
                  alt="게시물 이미지"
                  className="attached-image"
                />
              )}
            </label>
          </div>
          <div className="box category">
            <label htmlFor="waste_category" className="form-title">
              카테고리
            </label>
            <select
              name="waste_category"
              value={wasteCategory}
              onChange={(e) => setWasteCategory(e.target.value)}
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
            <label htmlFor="title" className="form-title">
              제목
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div className="box state">
            <div className=" formTitle">폐기물 상태</div>
            <label htmlFor="best">최상</label>
            <input
              type="radio"
              name="waste_status"
              value="최상"
              checked={wasteStatus === "최상"}
              onChange={(e) => setWasteStatus(e.target.value)}
              required
            />
            <label htmlFor="good">상</label>
            <input
              type="radio"
              name="waste_status"
              value="상"
              checked={wasteStatus === "상"}
              onChange={(e) => setWasteStatus(e.target.value)}
            />
            <label htmlFor="average">중</label>
            <input
              type="radio"
              name="waste_status"
              value="중"
              checked={wasteStatus === "중"}
              onChange={(e) => setWasteStatus(e.target.value)}
            />
            <label htmlFor="poor">하</label>
            <input
              type="radio"
              name="waste_status"
              value="하"
              checked={wasteStatus === "하"}
              onChange={(e) => setWasteStatus(e.target.value)}
            />
            <label htmlFor="worst">최하</label>
            <input
              type="radio"
              name="waste_status"
              value="최하"
              checked={wasteStatus === "최하"}
              onChange={(e) => setWasteStatus(e.target.value)}
            />
          </div>
          <div className="box drop-down">
            <label htmlFor="sell_status" className="form-title">
              거래상태
            </label>
            <select
              name="sell_status"
              value={sellStatus}
              onChange={(e) => setSellStatus(e.target.value)}
              required
            >
              <option value="">선택하세요</option>
              <option value="거래중">거래중</option>
              <option value="거래완료">거래완료</option>
            </select>
          </div>
          {wastePrice.startsWith("0") ? (
            <div className="box price">
              <label htmlFor="wastePrice" className="form-title input-none">
                나눔
              </label>
              <input
                type="number"
                name="wastePrice"
                value={wastePrice}
                onChange={(e) =>
                  setWastePrice(handlePriceChange(e.target.value))
                }
                placeholder="제안 가격을 입력해주세요."
                className="input-none"
                min="0"
                required
              />
              <FaWonSign size="15" className="input-none" />
            </div>
          ) : (
            <div className="box price">
              <label htmlFor="wastePrice" className="form-title">
                가격
              </label>
              <input
                type="text"
                name="wastePrice"
                value={wastePrice}
                onChange={(e) =>
                  setWastePrice(handlePriceChange(e.target.value))
                }
                placeholder="제안 가격을 입력해주세요."
                min="0"
                required
              />
              <FaWonSign size="15" />
            </div>
          )}

          <div className="box content">
            <label htmlFor="content" className="form-title">
              설명
            </label>
            <br />
            <textarea
              name="content"
              value={content}
              onChange={handleContentChange}
              rows="4"
              cols="50"
              required
              placeholder="설명을 입력해주세요."
            ></textarea>
          </div>
          <div className="box address">
            <label htmlFor="address" className="form-title">
              주소
            </label>
            <input
              type="text"
              // defaultValue={
              //   address.find((item) => item.key === "address").value
              // }
              defaultValue={address.address}
              placeholder="주소/위치를 입력해주세요."
              required
              onClick={handleOpenAddressModal}
            />
            {/* <input
              type="text"
              defaultValue={address.zipcode}
              placeholder="아"
            /> */}

            <button type="button" onClick={handleOpenAddressModal}>
              주소 검색
            </button>
          </div>

          <button type="submit">작성</button>
        </form>
      </S.Container>
    </div>
  );
};

export default ProductAdd;
