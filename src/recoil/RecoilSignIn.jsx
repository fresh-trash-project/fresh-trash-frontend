import { atom } from 'recoil';

export const signInState = atom({
  key: 'signIn',
  default: false,
});

export const signInPanelState = atom({
  key: 'signInPanel',
  default: true,
});
