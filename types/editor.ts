export interface Instrument<T> {
  name: string;
  player: T;
  playFn: () => void;
}

export type LAYER_TYPE = 'melody' | 'drum';
