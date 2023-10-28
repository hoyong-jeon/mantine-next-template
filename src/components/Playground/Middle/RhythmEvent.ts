import { ToneEvent, Sampler, Time } from 'tone';
import RhythmInstrument from './RhythmInstrument';

interface Value {
  duration: number;
}

export default class RhythmEvent {
  event: ToneEvent;
  instrument: RhythmInstrument;

  constructor(instrument: RhythmInstrument, startStep: number, value: Value) {
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

  update(instrument: RhythmInstrument, startStep: number, value: Value) {
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

  updateInstrument(instrument: RhythmInstrument) {
    this.instrument = instrument;

    this.event.callback = (time, v) => {
      this.instrument.play(v.duration, time);
    };
  }

  delete() {
    this.event.dispose();
  }
}
