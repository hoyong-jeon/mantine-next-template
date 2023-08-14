import { ToneEvent, Synth } from 'tone';
import { TIME_PER_STEP } from '@constants/editor';

interface Value {
  note: string;
  duration: number;
}

export default class SynthEvent {
  event: ToneEvent;
  instrument: Synth;

  constructor(
    instrument: Synth,
    startTime: number,
    value: Value = { note: 'C4', duration: TIME_PER_STEP }
  ) {
    this.instrument = instrument;
    // this.instrument.toDestination();
    console.log(this.instrument);
    this.instrument.triggerAttackRelease(value.note, '16n');

    this.event = new ToneEvent<Value>();
    this.event.value = value;
    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration * TIME_PER_STEP, time);
    };
    this.event.start(startTime * TIME_PER_STEP);
  }

  edit(startTime: number, value: Value) {
    this.event.value = value;
    this.event.start(startTime);
  }
}
