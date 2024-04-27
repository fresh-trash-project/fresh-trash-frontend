import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
export const HeartedState = atom({
  key: 'HeartedState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
