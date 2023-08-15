import React from 'react';
import { Player } from 'tone';
import type { Instrument } from '@customTypes/editor';

type Drum = Instrument;

const DRUM_PATHS = [
  '/sounds/kick.mp3',
  '/sounds/snare.mp3',
  '/sounds/hihat-closed.mp3',
  '/sounds/hihat-open.mp3',
  '/sounds/tom-low.mp3',
  '/sounds/tom-mid.mp3',
  '/sounds/tom-high.mp3',
  '/sounds/clap.mp3',
  '/sounds/ride.mp3',
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
    drumkitRef.current = DRUM_PATHS.map((path) => ({
      name: getPascalName(path),
      player: new Player(path).toDestination(),
      playFn: () => {
        const target = drumkitRef.current.find(({ name }) => name === getPascalName(path));
        if (target) (target.player as Player).start();
      },
    }));

    return () => {
      drumkitRef.current.forEach(({ player }) => (player as Player).dispose());
    };
  }, []);

  React.useEffect(() => {
    if (drumkitRef.current.length > 0) {
      setIsDrumkitReady(true);
    }
  }, [drumkitRef.current]);

  return { drumkit: drumkitRef.current, isDrumkitReady };
}
