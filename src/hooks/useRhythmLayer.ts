import { InstKits, Layer } from '@customTypes/playground';
import React from 'react';
import { SamplerOptions } from 'tone';
import { RHYTHM_KITS, RHYTHM_SCALE } from '@constants/playground';
import RhythmInstrument from '@components/Playground/Middle/rhythm/RhythmInstrument';

const RhythmInstrumentOptions = (kitName: string): Partial<SamplerOptions> => ({
  release: 1,
  baseUrl: '/sounds/rhythm/',
  urls: {
    C1: `${kitName}/C1.mp3`,
    D1: `${kitName}/D1.mp3`,
    E1: `${kitName}/E1.mp3`,
    F1: `${kitName}/F1.mp3`,
    G1: `${kitName}/G1.mp3`,
    A1: `${kitName}/A1.mp3`,
    B1: `${kitName}/B1.mp3`,
  },
});

export default function useRhythmLayer(): {
  rhythmLayer: Layer | null;
  isRhythmLayerReady: boolean;
} {
  const rhythmLayerRef = React.useRef<Layer | null>(null);
  const [isRhythmLayerReady, setIsRhythmLayerReady] = React.useState(false);

  const RhythmLayerMeta = {
    layerType: 'rhythm' as const,
    unitHeight: 50,
  };

  React.useEffect(() => {
    if (rhythmLayerRef.current) return;

    rhythmLayerRef.current = {
      layerMeta: RhythmLayerMeta,
      instKits: RHYTHM_KITS.reduce((acc, name) => {
        const kit = RHYTHM_SCALE.reduce((ac, note) => {
          const inst = new RhythmInstrument(note, RhythmInstrumentOptions(name)).toDestination();
          return { ...(ac as InstKits), [note]: inst };
        }, {} as InstKits);

        return { ...acc, [name]: kit } as unknown as InstKits;
      }, {} as InstKits),
    };

    // continuously check if all instruments are loaded, and set isRhythmLayerReady. if so, clear interval

    const checkIfReady = setInterval(() => {
      if (!rhythmLayerRef.current) return;
      const { instKits } = rhythmLayerRef.current;
      const isReady = Object.values(instKits).every((kit) =>
        Object.values(kit).every((inst) => (inst as RhythmInstrument).loaded)
      );
      if (isReady) {
        setIsRhythmLayerReady(true);
        clearInterval(checkIfReady);
      }
    }, 100);

    return () => {
      if (!rhythmLayerRef.current) return;
      const { instKits } = rhythmLayerRef.current;

      Object.values(instKits).forEach((kit) => {
        Object.values(kit).forEach((inst) => {
          (inst as RhythmInstrument).dispose();
        });
      });
    };
  }, []);

  return { rhythmLayer: rhythmLayerRef.current, isRhythmLayerReady };
}
