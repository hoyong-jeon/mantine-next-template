import * as Tone from 'tone';

export interface Instrument {
  name: string;
  player: Tone.Synth | Tone.Sampler | Tone.Player;
  playFn: () => void;
}

export type LayerType = 'melody' | 'drum';
