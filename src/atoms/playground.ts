import { Denominator, Numerator, Resolution } from '@customTypes/playground';
import { atom } from 'recoil';

type PlayState = 'playing' | 'paused' | 'stopped';

export const playState = atom<PlayState>({
  key: 'playState',
  default: 'stopped',
});

export const scrollLeftState = atom({
  key: 'scrollLeftState',
  default: 0,
});

export const timeState = atom({
  key: 'timeState',
  default: '0',
});

export const bpmState = atom({
  key: 'bpmState',
  default: 120,
});

export const resolutionState = atom<Resolution>({
  key: 'resolutionState',
  default: '16n',
});

export const numerState = atom<Numerator>({
  key: 'numerState',
  default: '6',
});

export const denomState = atom<Denominator>({
  key: 'denomState',
  default: '8',
});
