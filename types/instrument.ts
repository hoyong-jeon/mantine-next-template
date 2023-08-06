export interface Instrument<T> {
  name: string;
  player: T;
  playFn: () => void;
}
