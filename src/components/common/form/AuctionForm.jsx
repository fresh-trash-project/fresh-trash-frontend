import React, { useState, useEffect } from 'react';
import { IoIosCamera } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import urlJoin from 'url-join';
import { globalFileAPI } from '../../../../variable';
import { createAuction } from '../../../api/AuctionAPI';

const AuctionForm = ({ initialData, isEditMode }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [productCategory, setProductCategory] = useState(
    initialData.productCategory || '',
  );
  const [productStatus, setProductStatus] = useState(
    initialData.productStatus || '최상',
  );
  const [auctionStatus, setAuctionStatus] = useState(
    initialData.auctionStatus || 'ONGOING',
  );
  const [minimumBid, setMinimumBid] = useState(initialData.minimumBid || '');
  // const [address, setAddress] = useState(
  //   initialData.address || {
  //     zipcode: '',
  //     state: '',
  //     city: '',
  //     district: '',
  //     detail: '',
  //   },
  // );
  const [imgFile, setImgFile] = useState(null);
  // const [minBid, setMinBid] = useState(initialData.minBid || '');
  const [endedAt, setEndedAt] = useState(initialData.endedAt || '');
  const [startedAt, setStartedAt] = useState(initialData.startAt || '');
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const handleValueChange = newValue => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };
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

  // const handleComplete = data => {
  //   setAddress({
  //     // address: data.address,
  //     zipcode: data.zonecode,
  //     state: data.sido,
  //     city: data.sigungu,
  //     district: data.bname,
  //     detail: data.buildingName,
  //   });
  // };

  // const handleOpenAddressModal = () => {
  //   new window.daum.Postcode({
  //     oncomplete: handleComplete,
  //   }).open();
  // };
  const handleMinimumBidChange = e => {
    const value = e.target.value;
    if (/^[0-9]\d*$/.test(value) || value === '') {
      setMinimumBid(value);
    } else {
      alert('양수를 입력하세요.');
    }
  };
  const formatDateTime = dateTime => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // const formattedStartedAt = startedAt.includes(':')
    //   ? `${startedAt}:00`
    //   : startedAt;
    // const formattedEndedAt = endedAt.includes(':') ? `${endedAt}:00` : endedAt;
    const formattedStartedAt = formatDateTime(startedAt);
    const formattedEndedAt = formatDateTime(endedAt);
    await createAuction(
      title,
      content,
      productCategory,
      productStatus,
      auctionStatus,
      minimumBid,
      formattedStartedAt,
      formattedEndedAt,
      imgFile,
      navigate,
    );
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
                src={URL.createObjectURL(imgFile)}
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
            placeholder="제목을 입력하세요"
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
              value={productCategory}
              onChange={e => setProductCategory(e.target.value)}
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
            경매제품 상태
          </div>
          <div className="flex">
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
              최상
            </label>
            <input
              type="radio"
              name="productStatus"
              value="BEST"
              checked={productStatus === 'BEST'}
              onChange={e => setProductStatus(e.target.value)}
              required
              className="radio checked:bg-green-900 mr-5"
            />
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
              상
            </label>
            <input
              type="radio"
              name="productStatus"
              value="GOOD"
              checked={productStatus === 'GOOD'}
              onChange={e => setProductStatus(e.target.value)}
              required
              className="radio checked:bg-green-900 mr-5"
            />
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
              중
            </label>
            <input
              type="radio"
              name="productStatus"
              value="NORMAL"
              checked={productStatus === 'NORMAL'}
              onChange={e => setProductStatus(e.target.value)}
              required
              className="radio checked:bg-green-900 mr-5"
            />
            <label className="block uppercase tracking-wide mr-1.5 text-gray-700 text-xs font-bold mb-2">
              하
            </label>
            <input
              type="radio"
              name="productStatus"
              value="WORST"
              checked={productStatus === 'WORST'}
              onChange={e => setProductStatus(e.target.value)}
              required
              className="radio checked:bg-green-900 mr-5"
            />
          </div>
        </div>
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            최소 가격
          </label>
          <input
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="number"
            name="minimumBid"
            value={minimumBid}
            onChange={handleMinimumBidChange}
            placeholder="가격을 입력하세요."
            required
          />
        </div>

        <div className="w-full px-3 mb-6">
          <div className="">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              경매기간
            </label>
            <div className="flex items-center">
              <input
                type="datetime-local"
                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={startedAt}
                onChange={e => setStartedAt(e.target.value)}
              />
              <p className="font-bold">~</p>
              <input
                type="datetime-local"
                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={endedAt}
                onChange={e => setEndedAt(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* <div className="w-full px-3 mb-6">
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
        </div> */}
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            내용
          </label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="h-48 no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="내용을 입력하세요"
            required
          />
        </div>
        <div className="flex w-full justify-end mt-2 px-3 mb-6 gap-4">
          <button
            className=" bg-green-900 hover:bg-green-700 text-white font-bold mt-3 py-3 px-4 rounded bg-green-900!important"
            type="submit"
          >
            {'등록하기'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuctionForm;
