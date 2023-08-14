export interface Instrument {
  name: string;
  player: unknown;
  playFn: () => void;
}

export type LayerType = 'melody' | 'drum';
