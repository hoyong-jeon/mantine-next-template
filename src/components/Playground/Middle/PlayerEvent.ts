import { ToneEvent, Player } from 'tone';
import { TIME_PER_STEP } from '@constants/editor';

interface Value {
  duration: number;
}

export default class PlayerEvent {
  event: ToneEvent;
  instrument: Player;

  constructor(instrument: Player, startTime: number, value: Value = { duration: TIME_PER_STEP }) {
    this.instrument = instrument;
    console.log(this.instrument);
    this.instrument.start();

    this.event = new ToneEvent<Value>();
    this.event.value = value;
    this.event.callback = (time, v) => {
      this.instrument.start(time, 0, v.duration);
    };
    this.event.start(startTime * TIME_PER_STEP);
  }

  edit(startTime: number, value: Value) {
    this.event.value = value;
    this.event.start(startTime);
  }
}
