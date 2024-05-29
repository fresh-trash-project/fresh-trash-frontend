import React, { useState, useEffect } from 'react';
import { IoIosCamera } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import urlJoin from 'url-join';
import { globalFileAPI } from '../../../../variable';
import { updatePost, createPost } from '../../../api/WastesApi';
const ProductForm = ({ initialData, isEditMode }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [wasteCategory, setWasteCategory] = useState(
    initialData.wasteCategory || '',
  );
  const [wasteStatus, setWasteStatus] = useState(
    initialData.wasteStatus || '최상',
  );
  const [sellStatus, setSellStatus] = useState(
    initialData.sellStatus || 'ONGOING',
  );
  const [wastePrice, setWastePrice] = useState(initialData.wastePrice || '');
  const [address, setAddress] = useState(
    initialData.address || {
      zipcode: '',
      state: '',
      city: '',
      district: '',
      detail: '',
    },
  );
  const [imgFile, setImgFile] = useState(initialData.fileName || null);

  const navigate = useNavigate();
  const { wasteId } = useParams();
  const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      if (validImageTypes.includes(file.type)) {
        setImgFile(file);
      } else {
        alert('올바른 이미지 형식을 선택하세요. (JPEG, JPG, PNG)');
        e.target.value = null;
      }
    }
  };

  const handleComplete = data => {
    setAddress({
      // address: data.address,
      zipcode: data.zonecode,
      state: data.sido,
      city: data.sigungu,
      district: data.bname,
      detail: data.buildingName,
    });
  };

  const handleOpenAddressModal = () => {
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const postData = {
      title,
      content,
      wasteCategory,
      wasteStatus,
      sellStatus,
      wastePrice: Number(wastePrice),
      address,
      imgFile,
      navigate,
    };

    try {
      if (isEditMode) {
        await updatePost(
          wasteId,
          postData.title,
          postData.content,
          postData.wasteCategory,
          postData.wasteStatus,
          postData.sellStatus,
          postData.wastePrice,
          postData.address,
          postData.imgFile,
          navigate,
        );
      } else {
        await createPost(
          postData.title,
          postData.content,
          postData.wasteCategory,
          postData.wasteStatus,
          postData.sellStatus,
          postData.wastePrice,
          postData.address,
          postData.imgFile,
          navigate,
        );
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };
  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 w-full p-5 rounded-md lg:w-full max-w-3xl"
    >
      <div className="flex flex-wrap -mx-3 ">
        <div className="w-full px-3 mb-6">
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
                src={
                  isEditMode
                    ? getImgeUrl(imgFile)
                    : URL.createObjectURL(imgFile)
                }
                alt="게시물 이미지"
                className="w-36 h-36"
              />
            )}
          </label>
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            제목
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            카테고리
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
        <div className="w-full px-3 mb-6">
          <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            폐기물 상태
          </div>
          <div className="flex">
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
              최상
            </label>
            <input
              type="radio"
              name="wasteStatus"
              value="BEST"
              checked={wasteStatus === 'BEST'}
              onChange={e => setWasteStatus(e.target.value)}
              required
              className="radio checked:bg-green-900 mr-5"
            />
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
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
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
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
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
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
          </div>
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {Number(wastePrice) === 0 ? '나눔' : '가격'}
          </label>
          <input
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="number"
            min="0"
            step="100"
            name="wastePrice"
            value={Number(wastePrice)}
            onChange={e => setWastePrice(e.target.value)}
            placeholder="가격을 입력하세요 (0 입력 시 나눔)"
            required
          />
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            주소
          </label>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                name="zipcode"
                value={` ${address.state} ${address.city} ${address.district} ${address.detail}`}
                onChange={e => setAddress(e.target.value)}
                readOnly
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="주소/위치를 입력해주세요."
                required
              />
              <button
                type="button"
                onClick={handleOpenAddressModal}
                className=" w-32  ml-4  bg-green-900 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded text-center "
              >
                주소검색
              </button>
            </div>
          </div>
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            내용
          </label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="h-48 no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          />
        </div>
        <div className="flex w-full justify-end mt-2 px-3 mb-6 gap-4">
          <button
            className=" bg-green-900 hover:bg-green-700 text-white font-bold mt-3 py-3 px-4 rounded bg-green-900!important"
            type="submit"
          >
            {isEditMode ? '수정하기' : '등록하기'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
