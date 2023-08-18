import * as Scale from 'tonal-scale';
import { Synth } from 'tone';

export default function genSynths(
  tonic: string = 'C',
  scale: string = 'major',
  octaveRange: number[] = [3, 5]
) {
  const notes = [];
  const baseNotes = Scale.notes(`${tonic} ${scale}`);
  const octaves = octaveRange[1] - octaveRange[0] + 1;

  for (let i = 0; i < octaves; i += 1) {
    notes.push(...baseNotes.map((note) => `${note}${octaveRange[0] + i}`));
  }

  notes.push(baseNotes[0] + (octaveRange[1] + 1));

  return notes.map((note) => {
    const synth = new Synth().toDestination();
    return {
      name: note,
      player: synth,
      playFn: () => synth.triggerAttackRelease(note, '16n'),
    };
  });
}
