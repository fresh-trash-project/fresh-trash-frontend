import { atom } from 'recoil';

export const signInState = atom({
  key: 'signIn',
  default: false,
});

export const signInPanelState = atom({
  key: 'signInPanel',
  default: true,
});

export const verificationState = atom({
  key: 'verification',
  default: false,
});

export const registerMessageState = atom({
  key: 'registerMessage',
  default: false,
});
