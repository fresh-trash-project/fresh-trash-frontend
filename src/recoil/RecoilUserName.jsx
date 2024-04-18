import { atom } from 'recoil';
//atom: 리코일 전역state, key: atom의 이름
export const userNameState = atom({
  key: 'userName',
  default: '닉네임',
});

export const duplicationState = atom({
  key: 'duplication',
  default: false,
});

export const duplicationMessageState = atom({
  key: 'duplicationMessage',
  default: '',
});
