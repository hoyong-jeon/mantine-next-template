import { ToneEvent, Sampler, Time } from 'tone';

interface Value {
  note: string;
  duration: number;
}

export default class RhythmEvent {
  event: ToneEvent;
  instrument: Sampler;

  constructor(instrument: Sampler, startStep: number, value: Value) {
    this.instrument = instrument;
    // console.log(this.instrument);
    this.instrument.triggerAttackRelease(value.note, '16n');

    this.event = new ToneEvent<Value>();
    this.event.value = value;
    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration * Time('16n').toSeconds(), time);
    };
    this.event.start(startStep * Time('16n').toSeconds());
  }

  update(instrument: Sampler, startStep: number, value: Value) {
    this.instrument = instrument;

    this.event.dispose();
    this.event = new ToneEvent<Value>();
    this.event.value = value;

    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration * Time('16n').toSeconds(), time);
    };
    this.event.value = value;
    this.event.start(startStep * Time('16n').toSeconds());
  }

  updateInstrument(instrument: Sampler) {
    this.instrument = instrument;

    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration * Time('16n').toSeconds(), time);
    };
  }

  delete() {
    this.event.dispose();
  }
}
