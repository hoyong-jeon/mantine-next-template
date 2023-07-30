import React from 'react';
import * as Scale from 'tonal-scale';
import { Synth } from 'tone';

interface PianoRoll {
  name: string;
  instrument: Synth;
}

export default function usePiano(
  tonic: string = 'C',
  scale: string = 'major',
  octaveRange: number[] = [3, 5]
) {
  const pianoRef = React.useRef<PianoRoll[]>([]);

  React.useEffect(() => {
    const notes = [];
    const baseNotes = Scale.notes(`${tonic} ${scale}`);
    const octaves = octaveRange[1] - octaveRange[0] + 1;

    for (let i = 0; i < octaves; i += 1) {
      notes.push(...baseNotes.map((note) => `${note}${octaveRange[0] + i}`));
    }

    pianoRef.current = notes.map((note) => ({
      name: note,
      instrument: new Synth().toDestination(),
    }));

    return () => {
      pianoRef.current.forEach(({ instrument }) => instrument.dispose());
    };
  }, [tonic, scale, octaveRange]);

  return pianoRef.current;
}
