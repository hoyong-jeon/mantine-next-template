import { ToneEvent, Player } from 'tone';
import { TIME_PER_STEP } from '@constants/editor';

export default class PlayerEvent {
  event: ToneEvent;
  instrument: Player;

  constructor(instrument: Player, startStep: number) {
    this.instrument = instrument;
    // console.log(this.instrument);
    this.instrument.start();

    this.event = new ToneEvent();
    this.event.callback = () => {
      this.instrument.start();
    };
    this.event.start(startStep * TIME_PER_STEP);
  }

  update(instrument: Player, startStep: number) {
    this.instrument = instrument;

    this.event.dispose();
    this.event = new ToneEvent();
    this.event.callback = () => {
      this.instrument.start();
    };
    this.event.start(startStep * TIME_PER_STEP);
  }
}
