import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const postsState = atom({
  key: "postsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
