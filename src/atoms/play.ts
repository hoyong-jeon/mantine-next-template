import { atom } from 'recoil';

type PlayState = 'playing' | 'paused' | 'stopped';

export const playState = atom<PlayState>({
  key: 'playState',
  default: 'stopped',
});
