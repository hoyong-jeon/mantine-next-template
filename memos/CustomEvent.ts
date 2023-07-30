import { ToneEvent, Synth } from 'tone';

interface Value {
  note: string;
  duration: number;
}

export class CustomEvent {
  event: ToneEvent;
  instrument: Synth;

  constructor(startTime: number, value: Value = { note: 'C4', duration: 0.5 }) {
    this.instrument = new Synth().toDestination();

    this.event = new ToneEvent<Value>();
    this.event.value = value;
    this.event.callback = (time, v) => {
      this.instrument.triggerAttackRelease(v.note, v.duration, time);
    };
    this.event.start(startTime);
  }

  edit(startTime: number, value: Value) {
    this.event.value = value;
    this.event.start(startTime);
  }
}
