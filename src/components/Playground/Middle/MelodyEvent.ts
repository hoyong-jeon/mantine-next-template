import { ToneEvent, Time } from 'tone';
import MelodyInstrument from './MelodyInstrument';

interface Value {
  duration: number;
}

export default class MelodyEvent {
  event: ToneEvent;
  instrument: MelodyInstrument;

  constructor(instrument: MelodyInstrument, startStep: number, value: Value) {
    this.instrument = instrument;
    // console.log(this.instrument);
    this.instrument.playOnce();

    this.event = new ToneEvent<Value>();
    this.event.value = value;
    this.event.callback = (time, v) => {
      this.instrument.play(v.duration, time);
    };
    this.event.start(startStep * Time('16n').toSeconds());
  }

  update(instrument: MelodyInstrument, startStep: number, value: Value) {
    this.instrument = instrument;

    this.event.dispose();
    this.event = new ToneEvent<Value>();
    this.event.value = value;

    this.event.callback = (time, v) => {
      this.instrument.play(v.duration, time);
    };
    this.event.value = value;
    this.event.start(startStep * Time('16n').toSeconds());
  }

  updateInstrument(instrument: MelodyInstrument) {
    this.instrument = instrument;

    this.event.callback = (time, v) => {
      this.instrument.play(v.duration, time);
    };
  }

  delete() {
    this.event.dispose();
  }
}
