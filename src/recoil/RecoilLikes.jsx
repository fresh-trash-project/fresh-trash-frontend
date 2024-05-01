import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
export const LikesState = atom({
  key: 'LikesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
