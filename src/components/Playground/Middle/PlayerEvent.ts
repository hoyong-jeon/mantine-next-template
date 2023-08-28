import { ToneEvent, Player, Time } from 'tone';

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
    this.event.start(startStep * Time('16n').toSeconds());
  }

  update(instrument: Player, startStep: number) {
    this.instrument = instrument;

    this.event.dispose();
    this.event = new ToneEvent();
    this.event.callback = () => {
      this.instrument.start();
    };
    this.event.start(startStep * Time('16n').toSeconds());
  }

  delete() {
    this.event.dispose();
  }
}
