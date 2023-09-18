import { InstKits, Layer } from '@customTypes/playground';
import React from 'react';
import { Sampler } from 'tone';
import { useMantineTheme } from '@mantine/core';
import { MELODY_KITS } from '@constants/playground';

const cmajorC4toC2 = [
  'C4',
  'B3',
  'A3',
  'G3',
  'F3',
  'E3',
  'D3',
  'C3',
  'B2',
  'A2',
  'G2',
  'F2',
  'E2',
  'D2',
  'C2',
];

const basePath = '/sounds/melody/';

export default function useMelodyLayer(): {
  melodyLayer: Layer | null;
  isMelodyLayerReady: boolean;
} {
  const theme = useMantineTheme();

  const melodyLayerRef = React.useRef<Layer | null>(null);
  const [isMelodyLayerReady, setIsMelodyLayerReady] = React.useState(false);

  const MelodyLayerMeta = {
    layerType: 'melody' as const,
    highlightColor: theme.colors.teal[3],
    unitHeight: 30,
  };

  React.useEffect(() => {
    if (melodyLayerRef.current) return;

    melodyLayerRef.current = {
      layerMeta: MelodyLayerMeta,
      instKits: MELODY_KITS.reduce((acc, name) => {
        const sampler = new Sampler({
          urls: {
            C4: `${basePath}${name}/C4.mp3`,
            B3: `${basePath}${name}/B3.mp3`,
            A3: `${basePath}${name}/A3.mp3`,
            G3: `${basePath}${name}/G3.mp3`,
            F3: `${basePath}${name}/F3.mp3`,
            E3: `${basePath}${name}/E3.mp3`,
            D3: `${basePath}${name}/D3.mp3`,
            C3: `${basePath}${name}/C3.mp3`,
            B2: `${basePath}${name}/B2.mp3`,
            A2: `${basePath}${name}/A2.mp3`,
            G2: `${basePath}${name}/G2.mp3`,
            F2: `${basePath}${name}/F2.mp3`,
            E2: `${basePath}${name}/E2.mp3`,
            D2: `${basePath}${name}/D2.mp3`,
            C2: `${basePath}${name}/C2.mp3`,
          },
          release: 1,
        }).toDestination();

        const genPlayFn = (note: string) => () => {
          sampler.triggerAttackRelease(note, '16n');
        };

        return {
          ...acc,
          [name]: cmajorC4toC2.map((note) => ({
            name: note,
            player: sampler,
            playFn: genPlayFn(note),
          })),
        };
      }, {} as InstKits),
    };

    setTimeout(() => {
      const { instKits } = melodyLayerRef.current!;
      const isReady = Object.values(instKits).every((kit) =>
        kit.every(({ player }) => (player as Sampler).loaded)
      );
      setIsMelodyLayerReady(isReady);
    }, 1000);

    return () => {
      if (!melodyLayerRef.current) return;
      const { instKits } = melodyLayerRef.current;

      Object.values(instKits).forEach((kit) => {
        kit.forEach(({ player }) => {
          (player as Sampler).dispose();
        });
      });
    };
  }, []);

  return { melodyLayer: melodyLayerRef.current, isMelodyLayerReady };
}
