import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/WastesApi';
import { IoIosCamera } from 'react-icons/io';
const AddForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [wasteCategory, setWasteCategory] = useState('');
  const [wasteStatus, setWasteStatus] = useState('최상');
  const [sellStatus, setSellStatus] = useState('ONGOING');
  const [wastePrice, setWastePrice] = useState('');
  const [address, setAddress] = useState({
    zipcode: '',
    state: '',
    city: '',
    district: '',
    detail: '',
  });
  const [imgFile, setImgFile] = useState(null);
  const navigate = useNavigate();
  //주소찾기----------------------------------------------------
  //찾은 주소 input 반영
  const handleComplete = data => {
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

  //이미지 형식 제한-------------------------------------------------------
  const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      if (validImageTypes.includes(file.type)) {
        setImgFile(file);
      } else {
        alert('올바른 이미지 형식을 선택하세요. (JPEG, JPG, PNG)');
        // 선택한 파일 초기화
        e.target.value = null;
      }
    }
  };

  //제목 글자수 제한----------------------------------------------------------
  const handleTitleChange = e => {
    const inputValue = e.target.value;
    if (inputValue.length <= 255) {
      setTitle(inputValue);
    }
  };
  //내용 글자수 제한----------------------------------------------------------
  const handleContentChange = e => {
    const inputValue = e.target.value;

    if (inputValue.length <= 65535) {
      setContent(inputValue);
    }
  };

  //데이터 제출 --------------------------------------------------------------
  const handleSubmit = async e => {
    e.preventDefault();
    await createPost(
      title,
      content,
      wasteCategory,
      wasteStatus,
      sellStatus,
      wastePrice,
      address,
      imgFile,
      navigate,
    );
  };
  return (
    <div>
      <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <div className="ml-8 text-sm breadcrumbs">
          <ul>
            <li>홈</li>
            <li>폐기물등록</li>
          </ul>
        </div>
        <div className=" flex justify-center mt-10  ">
          <form
            onSubmit={handleSubmit}
            className=" bg-slate-50 w-full p-5 rounded-md lg:w-full max-w-3xl"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 ">
                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  이미지
                </p>
                <label
                  htmlFor="imgFile"
                  className="flex justify-center items-center w-36 h-36 bg-gray-200 rounded-md"
                >
                  <IoIosCamera size="80" />
                  <input
                    type="file"
                    id="imgFile"
                    name="imgFile"
                    accept="image/png, image/jpeg, image/jpg"
                    className="w-0 h-0 p-0 overflow-hidden border-0"
                    onChange={handleImageChange}
                    required
                  />
                  {imgFile && (
                    <img
                      src={imgFile && URL.createObjectURL(imgFile)}
                      alt="게시물 이미지"
                      className="w-36 h-36"
                    />
                  )}
                </label>
              </div>
              <div className="w-full px-3 mb-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  제목
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="제목을 입력하세요"
                  required
                />
              </div>
              <div className="w-full px-3 mb-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="wasteCategory"
                >
                  카테고리
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="wasteCategory"
                    value={wasteCategory}
                    onChange={e => setWasteCategory(e.target.value)}
                    required
                  >
                    <option value="">카테고리를 선택하세요</option>
                    <option value="ELECTRONICS">전자기기</option>
                    <option value="CLOTHING">의류</option>
                    <option value="HOME_KITCHEN">생활/주방</option>
                    <option value="BEAUTY">뷰티</option>
                    <option value="HEALTH">건강</option>
                    <option value="SPORTS">스포츠</option>
                    <option value="BOOKS">도서</option>
                    <option value="TOYS_GAMES">장난감/게임</option>
                    <option value="FURNITURE_DECOR">가구/인테리어</option>
                    <option value="PET_SUPPLIES">반려동물용품</option>
                    <option value="PLANT_SUPPLIES">식물</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full  px-3 mb-6 ">
                <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  폐기물 상태
                </div>
                <div className="flex">
                  <label
                    className=" block uppercase tracking-wide mr-1.5  text-gray-700 text-xs font-bold mb-2"
                    htmlFor="best"
                  >
                    최상
                  </label>
                  <input
                    type="radio"
                    name="wasteStatus"
                    value="BEST"
                    checked={wasteStatus === 'BEST'}
                    onChange={e => setWasteStatus(e.target.value)}
                    required
                    className="radio checked:bg-green-900 mr-5 "
                  />
                  <label
                    className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="good"
                  >
                    상
                  </label>
                  <input
                    type="radio"
                    name="wasteStatus"
                    value="GOOD"
                    checked={wasteStatus === 'GOOD'}
                    onChange={e => setWasteStatus(e.target.value)}
                    required
                    className="radio checked:bg-green-900 mr-5"
                  />
                  <label
                    className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="average"
                  >
                    중
                  </label>
                  <input
                    type="radio"
                    name="wasteStatus"
                    value="NORMAL"
                    checked={wasteStatus === 'NORMAL'}
                    onChange={e => setWasteStatus(e.target.value)}
                    required
                    className="radio checked:bg-green-900 mr-5"
                  />
                  <label
                    className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="poor"
                  >
                    하
                  </label>
                  <input
                    type="radio"
                    name="wasteStatus"
                    value="WORST"
                    checked={wasteStatus === 'WORST'}
                    onChange={e => setWasteStatus(e.target.value)}
                    required
                    className="radio checked:bg-green-900 mr-5"
                  />
                  {/* <label
                    className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2"
                    htmlFor="worst"
                  >
                    최하
                  </label>
                  <input
                    type="radio"
                    name="wasteStatus"
                    value="최하"
                    checked={wasteStatus === '최하'}
                    onChange={e => setWasteStatus(e.target.value)}
                    required
                    className="radio checked:bg-green-900  mr-5"
                  /> */}
                </div>
              </div>
              {wastePrice.startsWith('0') ? (
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="wastePrice"
                  >
                    나눔
                  </label>
                  <input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    name="wastePrice"
                    value={wastePrice}
                    onChange={e => setWastePrice(e.target.value)}
                    // onChange={handlePriceChange}
                    placeholder="제안 가격을 입력해주세요."
                    min="0"
                    required
                  />
                </div>
              ) : (
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="wastePrice"
                  >
                    가격
                  </label>
                  <input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    name="wastePrice"
                    value={wastePrice}
                    onChange={e => setWastePrice(e.target.value)}
                    // onChange={handlePriceChange}
                    placeholder="제안 가격을 입력해주세요."
                    min="0"
                    required
                  />
                </div>
              )}
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="content"
                >
                  설명
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="content"
                  value={content}
                  onChange={handleContentChange}
                  rows="4"
                  cols="50"
                  required
                  placeholder="설명을 입력해주세요."
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  주소
                </label>
                <div className="flex items-center">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="state"
                    defaultValue={address.address}
                    placeholder="주소/위치를 입력해주세요."
                    required
                    onClick={handleOpenAddressModal}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className=" bg-green-900 hover:bg-green-700 text-white font-bold mt-3 py-3 px-4 rounded"
            >
              작성
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
