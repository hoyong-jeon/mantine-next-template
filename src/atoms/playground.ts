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

type ResolutionState = '16n' | '8n' | '4n';

export const resolutionState = atom<ResolutionState>({
  key: 'resolutionState',
  default: '8n',
});

type Numerator = '6' | '3';
type Denominator = '16' | '8' | '4';

export const numerState = atom<Numerator>({
  key: 'numerState',
  default: '6',
});

export const denomState = atom<Denominator>({
  key: 'denomState',
  default: '8',
});

const NOTE_WIDTH: Record<ResolutionState, number> = {
  '16n': 20,
  '8n': 40,
  '4n': 80,
};

const RULER_GAP: Record<Denominator, number> = {
  '16': 20,
  '8': 40,
  '4': 80,
};

const STEPS_PER_QUARTER = 4;
