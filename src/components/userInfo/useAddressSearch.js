import { useState } from 'react';

const useAddressSearch = () => {
  const [address, setAddress] = useState({
    zipcode: '',
    state: '',
    city: '',
    district: '',
    detail: '',
  });

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: handleAddressChange,
    }).open();
  };

  const handleAddressChange = data => {
    setAddress({
      zipcode: data.zonecode,
      state: data.sido,
      city: data.sigungu,
      district: data.bname,
      detail: data.buildingName,
    });
  };

  return {
    address,
    setAddress,
    handleSearchAddress,
    handleAddressChange,
  };
};

export default useAddressSearch;
