import { Denominator, Numerator, Octave, Resolution, ScaleName } from '@customTypes/playground';
import getScale from '@utils/getScale';
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

export const octaveState = atom<[Octave, Octave]>({
  key: 'octaveState',
  default: ['3', '5'],
});

export const rootNoteState = atom({
  key: 'rootNoteState',
  default: 0,
});

export const scaleNameState = atom<ScaleName>({
  key: 'scaleNameState',
  default: 'major',
});

export const scaleState = selector({
  key: 'scaleState',
  get: ({ get }) => {
    const rootNote = get(rootNoteState);
    const scaleName = get(scaleNameState);

    return getScale(rootNote, scaleName);
  },
});
