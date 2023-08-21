import { ToneEvent, Synth } from 'tone';
import { TIME_PER_STEP } from '@constants/editor';

interface Value {
  note: string;
  duration: number;
}

export default class SynthEvent {
  event: ToneEvent;
  instrument: Synth;

  constructor(instrument: Synth, startStep: number, value: Value) {
    this.instrument = instrument;
    // console.log(this.instrument);
    this.instrument.triggerAttackRelease(value.note, '16n');

    this.event = new ToneEvent<Value>();
    this.event.value = value;
    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration * TIME_PER_STEP, time);
    };
    this.event.start(startStep * TIME_PER_STEP);
  }

  update(instrument: Synth, startStep: number, value: Value) {
    this.instrument = instrument;

    this.event.dispose();
    this.event = new ToneEvent<Value>();
    this.event.value = value;

    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration * TIME_PER_STEP, time);
    };
    this.event.value = value;
    this.event.start(startStep * TIME_PER_STEP);
  }

  delete() {
    this.event.dispose();
  }
}
