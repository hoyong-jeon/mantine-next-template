import { ToneEvent, Synth, Time, Sampler } from 'tone';

export type MelodyInst = Synth | Sampler;

interface Value {
  note: string;
  duration: number;
}

export default class MelodyEvent {
  event: ToneEvent;
  instrument: MelodyInst;

  constructor(instrument: MelodyInst, startStep: number, value: Value) {
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

  update(instrument: MelodyInst, startStep: number, value: Value) {
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

  updateInstrument(instrument: MelodyInst) {
    this.instrument = instrument;

    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration * Time('16n').toSeconds(), time);
    };
  }

  delete() {
    this.event.dispose();
  }
}
