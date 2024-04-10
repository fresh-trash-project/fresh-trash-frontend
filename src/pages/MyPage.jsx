import {
  MyPageContainer,
  ProfileInfo,
  Bell,
  RatingSection,
  RatingBar,
  FootStep,
  MyList,
  Heart,
} from "../styles/MyPageCSS";
import { useState } from "react";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("User Name");
  const [address, setAddress] = useState("");

  return (
    <MyPageContainer>
      <ProfileInfo>
        <div className="profile-img">
          <input type="image" />
        </div>
        <div className="user-info">
          <input
            type="text"
            placeholder="회원가입시 닉네임"
            className="user-name-input"
          />
          <br />
          <input
            type="search"
            placeholder="주소검색"
            className="address-input"
          />
          <br />
          <button className="edit-profile">프로필 수정</button>
        </div>
      </ProfileInfo>
      <Bell />

      <RatingSection>
        <div>
          <div className="my-rating">나의 평점</div>
          <div className="rating-value">4.5 / 5</div> {/* 데이터 받아오기  */}
        </div>
        <RatingBar></RatingBar>
        <FootStep></FootStep>
      </RatingSection>

      <MyList>
        <div className="lists">
          <div className="my-trade-list">
            <p>User Name의 거래 내역</p>
          </div>

          <div className="my-auction-list">
            <p>User Name의 경매 내역</p>
          </div>
        </div>

        <div className="likes">
          <div className="my-likes">
            <p>User Name의 관심 목록</p>
            <Heart />
          </div>
        </div>
      </MyList>
    </MyPageContainer>
  );
};

export default MyPage;
