import { useTranslation } from 'react-i18next';

const AddressEditor = ({
  address,
  setAddress,
  isEditing,
  handleSearchAddress,
}) => {
  const { t } = useTranslation();
  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="addr flex flex-col mx-auto">
      <div className="addr1 flex mb-2 items-center">
        <input
          type="text"
          name="search"
          placeholder={t('SEARCH_ADDRESS')}
          className="input input-bordered w-full"
          disabled={!isEditing}
          value={`${address.zipcode} ${address.state} ${address.city} ${address.district}`}
          readOnly
        />
        {isEditing && (
          <button onClick={handleSearchAddress} className="btn btn-sm ml-2">
            {t('SEARCH_ADDRESS')}
          </button>
        )}
      </div>
      <input
        type="text"
        name="detail"
        placeholder={t('ADDRESS_DETAIL')}
        className="input input-bordered w-full"
        disabled={!isEditing}
        value={address.detail}
        onChange={handleAddressChange}
      />
    </div>
  );
};

export default AddressEditor;
