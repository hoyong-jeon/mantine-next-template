import React from 'react';
import * as Scale from 'tonal-scale';
import { Synth } from 'tone';
import type { Instrument } from '~types/instrument';

type PianoRoll = Instrument<Synth>;

export default function usePiano(
  tonic: string = 'C',
  scale: string = 'major',
  octaveRange: number[] = [3, 5]
) {
  const pianoRef = React.useRef<PianoRoll[]>([]);
  const [isPianoReady, setIsPianoReady] = React.useState(false);

  React.useEffect(() => {
    const notes = [];
    const baseNotes = Scale.notes(`${tonic} ${scale}`);
    const octaves = octaveRange[1] - octaveRange[0] + 1;

    for (let i = 0; i < octaves; i += 1) {
      notes.push(...baseNotes.map((note) => `${note}${octaveRange[0] + i}`));
    }

    notes.push(baseNotes[0] + (octaveRange[1] + 1));

    pianoRef.current = notes.map((note) => ({
      name: note,
      player: new Synth().toDestination(),
      playFn: () => {
        const target = pianoRef.current.find(({ name }) => name === note);
        if (target) target.player.triggerAttackRelease(note, '8n');
      },
    }));

    return () => {
      pianoRef.current.forEach(({ player }) => player.dispose());
    };
  }, [tonic, scale, octaveRange]);

  React.useEffect(() => {
    if (pianoRef.current.length > 0) {
      setIsPianoReady(true);
    }
  }, [pianoRef.current]);

  return { piano: pianoRef.current, isPianoReady };
}
