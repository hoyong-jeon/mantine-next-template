import { Instrument } from '@customTypes/editor';
import React from 'react';
import { Sampler } from 'tone';

const cmajorC5toC3 = [
  'C5',
  'B4',
  'A4',
  'G4',
  'F4',
  'E4',
  'D4',
  'C4',
  'B3',
  'A3',
  'G3',
  'F3',
  'E3',
  'D3',
  'C3',
];

const baseUrl = '/sounds/melody/piano/';

export default function useMelody() {
  const melodyRef = React.useRef<Instrument[]>([]);
  const [isMelodyReady, setIsMelodyReady] = React.useState(false);

  React.useEffect(() => {
    if (melodyRef.current.length > 0) return;
    melodyRef.current = cmajorC5toC3.map((note) => ({
      name: note,
      player: new Sampler({
        urls: {
          [note]: `${note}.mp3`,
        },
        attack: 0.05,
        release: 1,
        baseUrl,
        onload: () => {
          setIsMelodyReady(true);
        },
      }).toDestination(),
      playFn: () => {
        const target = melodyRef.current.find(({ name }) => name === note);
        if (target) (target.player as Sampler).triggerAttackRelease(note, '8n');
      },
    }));

    return () => {
      melodyRef.current.forEach(({ player }) => (player as Sampler).dispose());
    };
  }, []);

  return { melody: melodyRef.current, isMelodyReady };
}
