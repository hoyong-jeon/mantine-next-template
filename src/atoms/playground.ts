import { STEPS_PER_QUARTER, TOTAL_WIDTH } from '@constants/playground';
import { Denominator, Numerator, Resolution } from '@customTypes/playground';
import { atom, selector } from 'recoil';

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
  default: '8n',
});

export const numerState = atom<Numerator>({
  key: 'numerState',
  default: '6',
});

export const denomState = atom<Denominator>({
  key: 'denomState',
  default: '8',
});
