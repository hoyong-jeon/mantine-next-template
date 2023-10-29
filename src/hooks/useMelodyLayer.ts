import { InstKits, InstrumentKit, Layer } from '@customTypes/playground';
import React from 'react';
import { Frequency, SamplerOptions } from 'tone';
import { useMantineTheme } from '@mantine/core';
import { MELODY_KITS } from '@constants/playground';
import MelodyInstrument from '@components/Playground/Middle/melody/MelodyInstrument';

const MelodyInstrumentOptions = (kitName: string): Partial<SamplerOptions> => ({
  release: 1,
  baseUrl: '/sounds/melody/',
  urls: {
    C4: `${kitName}/C4.mp3`,
    B3: `${kitName}/B3.mp3`,
    A3: `${kitName}/A3.mp3`,
    G3: `${kitName}/G3.mp3`,
    F3: `${kitName}/F3.mp3`,
    E3: `${kitName}/E3.mp3`,
    D3: `${kitName}/D3.mp3`,
    C3: `${kitName}/C3.mp3`,
    B2: `${kitName}/B2.mp3`,
    A2: `${kitName}/A2.mp3`,
    G2: `${kitName}/G2.mp3`,
    F2: `${kitName}/F2.mp3`,
    E2: `${kitName}/E2.mp3`,
    D2: `${kitName}/D2.mp3`,
    C2: `${kitName}/C2.mp3`,
  },
});

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
        const startNote = Frequency('C2').toMidi(); // 36
        const endNote = Frequency('B5').toMidi(); // 83

        const kit = Array.from({ length: endNote - startNote + 1 }).reduce((ac, _, i) => {
          const note = Frequency(startNote + i, 'midi').toNote();
          const inst = new MelodyInstrument(note, MelodyInstrumentOptions(name)).toDestination();
          return { ...(ac as InstrumentKit), [note]: inst };
        }, {} as InstrumentKit);

        return { ...acc, [name]: kit } as InstKits;
      }, {} as InstKits),
    };

    setTimeout(() => {
      const { instKits } = melodyLayerRef.current!;
      const isReady = Object.values(instKits).every((kit) =>
        Object.values(kit).every((inst) => (inst as MelodyInstrument).loaded)
      );
      setIsMelodyLayerReady(isReady);
    }, 10000);

    return () => {
      if (!melodyLayerRef.current) return;
      const { instKits } = melodyLayerRef.current;

      Object.values(instKits).forEach((kit) => {
        Object.values(kit).forEach((inst) => {
          (inst as MelodyInstrument).dispose();
        });
      });
    };
  }, []);

  return { melodyLayer: melodyLayerRef.current, isMelodyLayerReady };
}
