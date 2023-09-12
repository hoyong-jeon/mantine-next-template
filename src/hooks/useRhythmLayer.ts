import { InstKits, Layer } from '@customTypes/playground';
import React from 'react';
import { Sampler } from 'tone';
import { RHYTHM_KITS } from '@constants/playground';

const rhythmInstNames = ['B1', 'A1', 'G1', 'F1', 'E1', 'D1', 'C1'];

const basePath = '/sounds/rhythm/';

export default function useRhythmLayer(): {
  rhythmLayer: Layer | null;
  isRhythmLayerReady: boolean;
} {
  const rhythmLayerRef = React.useRef<Layer | null>(null);
  const [isRhythmLayerReady, setIsRhythmLayerReady] = React.useState(false);

  const RhythmLayerMeta = {
    layerType: 'rhythm' as const,
    unitHeight: 30,
  };

  React.useEffect(() => {
    if (rhythmLayerRef.current) return;

    rhythmLayerRef.current = {
      layerMeta: RhythmLayerMeta,
      instKits: RHYTHM_KITS.reduce((acc, name) => {
        const sampler = new Sampler({
          urls: {
            C1: `${basePath}${name}/C1.mp3`,
            D1: `${basePath}${name}/D1.mp3`,
            E1: `${basePath}${name}/E1.mp3`,
            F1: `${basePath}${name}/F1.mp3`,
            G1: `${basePath}${name}/G1.mp3`,
            A1: `${basePath}${name}/A1.mp3`,
            B1: `${basePath}${name}/B1.mp3`,
          },
          release: 1,
        }).toDestination();

        const genPlayFn = (note: string) => () => {
          sampler.triggerAttackRelease(note, '16n');
        };

        return {
          ...acc,
          [name]: rhythmInstNames.map((note) => ({
            name: note,
            player: sampler,
            playFn: genPlayFn(note),
          })),
        };
      }, {} as InstKits),
    };

    setTimeout(() => {
      const { instKits } = rhythmLayerRef.current!;
      const isReady = Object.values(instKits).every((kit) =>
        kit.every(({ player }) => (player as Sampler).loaded)
      );
      setIsRhythmLayerReady(isReady);
    }, 1000);

    return () => {
      if (!rhythmLayerRef.current) return;
      const { instKits } = rhythmLayerRef.current;

      Object.values(instKits).forEach((kit) => {
        kit.forEach(({ player }) => {
          (player as Sampler).dispose();
        });
      });
    };
  }, []);

  return { rhythmLayer: rhythmLayerRef.current, isRhythmLayerReady };
}
