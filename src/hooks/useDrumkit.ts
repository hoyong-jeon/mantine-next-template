import React from 'react';
import { Player } from 'tone';
import type { Instrument } from '@customTypes/editor';

type Drum = Instrument;

const DRUM_PATHS = [
  '/sounds/rhythm/drum/crash.mp3',
  '/sounds/rhythm/drum/open_h.mp3',
  '/sounds/rhythm/drum/closed_h.mp3',
  '/sounds/rhythm/drum/clap.mp3',
  '/sounds/rhythm/drum/snap.mp3',
  '/sounds/rhythm/drum/snare.mp3',
  '/sounds/rhythm/drum/kick.mp3',
];

function convertToPascalCase(input: string): string {
  return input
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function getPascalName(path: string): string {
  const parts = path.split('/');
  const fileName = parts[parts.length - 1];
  const fileNameWithoutExtension = fileName.replace(/\.\w+$/, '');
  return convertToPascalCase(fileNameWithoutExtension);
}

export default function useDrumkit() {
  const drumkitRef = React.useRef<Drum[]>([]);
  const [isDrumkitReady, setIsDrumkitReady] = React.useState(false);

  React.useEffect(() => {
    if (drumkitRef.current.length > 0) return;
    drumkitRef.current = DRUM_PATHS.map((path) => ({
      name: getPascalName(path),
      player: new Player({
        url: path,
        onload: () => {
          setIsDrumkitReady(true);
        },
      }).toDestination(),
      playFn: () => {
        const target = drumkitRef.current.find(({ name }) => name === getPascalName(path));
        if (target) (target.player as Player).start();
      },
    }));

    return () => {
      drumkitRef.current.forEach(({ player }) => (player as Player).dispose());
    };
  }, []);

  return { drumkit: drumkitRef.current, isDrumkitReady };
}
