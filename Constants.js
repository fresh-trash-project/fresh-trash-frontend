export const MESSAGES = {
  //인증코드
  SEND_CODE_SUCCESS: '이메일로 받은 인증 코드를 입력하세요',
  INVALID_CODE_ERROR: '잘못된 인증코드입니다.',
  VERIFY_SUCCESS: '인증이 완료되었습니다.',

  //이메일
  WRITE_EMAIL: '이메일을 입력하세요.',
  INVALID_EMAIL_ERROR: '잘못된 이메일입니다.',
  EMAIL_EXIST_ERROR: '이미 존재하는 이메일입니다.',
  WRONG_EMAIL_AND_PASSWORD: '잘못된 이메일 또는 비밀번호 입니다.',

  //비밀번호
  INVALID_PASSWORD:
    '영어소문자, 숫자, 특수문자가 포함된 8자리 이상의 비밀번호로 넣어주세요.',
  PASSWORD_RESET_SUCCESS: '이메일로 임시 비밀번호가 발송되었습니다.',
  NEW_PASSWORD_NOT_MATCH: '새 비밀번호가 일치하지 않습니다.',
  PASSWORD_UPDATE_FAILURE: '비밀번호 변경에 실패했습니다',
  PASSWORD_UPDATE_SUCCESS:
    '비밀번호가 성공적으로 변경되었습니다. 잠시 후 로그아웃됩니다. 새 비밀번호로 다시 로그인 하세요.',

  //회원가입, 로그인
  SIGN_UP_SUCCESS: '성공적으로 회원가입 되었습니다. 로그인 하세요.',
  USER_NOT_FOUND_ERROR: '유저 정보가 존재하지 않습니다. 회원 가입 먼저 하세요.',

  //닉네임
  USERNAME_AVAILABLE: '사용 가능한 닉네임입니다.',
  USERNAME_DUPLICATE: '중복된 닉네임입니다.',

  //프로필 수정
  PROFILE_UPDATE_FAILURE: '프로필 수정에 실패했습니다.',

  //평점
  SEND_RATING_SUCCESS: '평점이 제출되었습니다.',
};

export const CONSOLE = {
  GENERIC_ERROR: '에러',
  RESOURCE_NOT_FOUND_ERROR:
    '401에러: 요청한 리소스를 찾을 수 없습니다. 유효하지 않은 토큰 또는 만료된 토큰입니다. 토큰을 삭제하고 로그아웃됩니다.',

  ALARM_READ: '알림이 읽음 처리되었습니다.',

  FETCH_MY_LIKES_SUCCESS: '나의 관심목록을 불러왔습니다.',
  FETCH_MY_ON_SALE_LIST_SUCCESS: '나의 판매중 리스트를 불러왔습니다.',
  FETCH_MY_DONE_SALE_LIST_SUCCESS: '나의 판매완료 리스트를 불러왔습니다.',
  FETCH_MY_BUY_LIST_SUCCESS: '나의 구매내역을 불러왔습니다.',
  FETCH_MY_ONGOING_AUCTION_LIST_SUCCESS: '나의 경매중 리스트를 불러왔습니다.',
  FETCH_MY_DONE_AUCTION_LIST_SUCCESS: '나의 완료된 경매 리스트를 불러왔습니다.',
  FETCH_MY_WINNING_BID_LIST_SUCCESS: '나의 낙찰 리스트를 불러왔습니다.',

  FETCH_POSTS_ERROR: '게시글 목록을 가져오는 중 에러 발생',
  FETCH_POSTS_SUCCESS: '게시글 목록을 가져오기 성공',
};
