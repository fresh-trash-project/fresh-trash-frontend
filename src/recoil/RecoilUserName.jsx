import { atom } from 'recoil';
//atom: 리코일 전역state, key: atom의 이름
export const userNameState = atom({
  key: 'userName',
  default: '',
});

// export const duplicationState = atom({
//   key: 'duplication',
//   default: false,
// });
