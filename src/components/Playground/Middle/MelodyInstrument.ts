import { Sampler, SamplerOptions, Time, isNote } from 'tone';
import { NormalRange, Time as TimeType } from 'tone/build/esm/core/type/Units';

export default class MelodyInstrument extends Sampler {
  note: string;

  constructor(note: string, options?: Partial<SamplerOptions>) {
    if (!isNote) throw new Error('note must be a valid note string');

    super(options);
    this.note = note;
  }

  playOnce(): this {
    return this.triggerAttackRelease(this.note, '16n');
  }

  play(duration: number, time?: TimeType, velocity?: NormalRange): this {
    return this.triggerAttackRelease(this.note, duration * Time('16n').toSeconds(), time, velocity);
  }
}
