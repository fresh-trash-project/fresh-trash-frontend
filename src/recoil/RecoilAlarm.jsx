import { atom } from 'recoil';

export const AlarmState = atom({
  key: 'alarm',
  default: false,
});

export const AlarmMsgState = atom({
  key: 'alarmMsg',
  default: [],
});
