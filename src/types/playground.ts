import {
  Denominators,
  Numerators,
  Resolutions,
  KITS,
  SCALE_NAMES,
  OCTAVES,
} from '@constants/playground';
import * as Tone from 'tone';

export interface Instrument {
  name: string;
  player: Tone.Synth | Tone.Sampler | Tone.Player;
  playFn: () => void;
}

export type LayerType = 'melody' | 'rhythm';
export type LayerMeta = {
  layerType: LayerType;
  unitHeight: number;
  highlightColor?: string;
};

export type Kit = typeof KITS[number];
export type InstKits = Record<Kit, Instrument[]>;
export interface Layer {
  layerMeta: LayerMeta;
  instKits: InstKits;
}

export type Numerator = typeof Numerators[number];
export type Denominator = typeof Denominators[number];

export type Resolution = typeof Resolutions[number];

export type ScaleName = typeof SCALE_NAMES[number];
export type Octave = typeof OCTAVES[number];
