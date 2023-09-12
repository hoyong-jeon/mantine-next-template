import { ToneEvent, Sampler, Time } from 'tone';

export default class RhythmEvent {
  event: ToneEvent;
  instrument: Sampler;

  constructor(instrument: Sampler, startStep: number, value: { note: string }) {
    this.instrument = instrument;
    // console.log(this.instrument);
    this.instrument.triggerAttackRelease(value.note, '16n');

    this.event = new ToneEvent();
    this.event.callback = () => {
      this.instrument.triggerAttackRelease(value.note, '16n');
    };
    this.event.start(startStep * Time('16n').toSeconds());
  }

  update(instrument: Sampler, startStep: number, value: { note: string }) {
    this.instrument = instrument;

    this.event.dispose();
    this.event = new ToneEvent();
    this.event.callback = () => {
      this.instrument.triggerAttackRelease(value.note, '16n');
    };
    this.event.start(startStep * Time('16n').toSeconds());
  }

  delete() {
    this.event.dispose();
  }
}
