import { Button } from '@mantine/core';
import React from 'react';
import * as Tone from 'tone';

type Instrument = 'i1' | 'i2';
type Value = {
  time: number;
  duration: number;
  note: string;
  velocity: number;
  inst: Instrument;
};

export default function HomePage() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const instrumentRef = React.useRef<Record<Instrument, Tone.Synth | Tone.DuoSynth> | null>(null);
  const partRef = React.useRef<Tone.Part<Value> | null>(null);

  React.useEffect(() => {
    instrumentRef.current = {
      i1: new Tone.Synth().toDestination(),
      i2: new Tone.DuoSynth().toDestination(),
    };

    instrumentRef.current.i2.volume.value = -30;

    partRef.current = new Tone.Part<Value>(
      (time, value) => {
        const { inst, note, duration, velocity } = value;
        if (!instrumentRef.current) return;
        instrumentRef.current[inst].triggerAttackRelease(note, duration, '+0.05', velocity);
      },
      [
        { time: 0.1, duration: 0.5, note: 'C3', velocity: 0.9, inst: 'i1' },
        { time: 0.6, duration: 0.7, note: 'D3', velocity: 0.9, inst: 'i1' },
      ]
    ).start(0);
  });

  const handlePlay = () => {
    if (!isInitialized) {
      Tone.start();
      setIsInitialized(true);
    }

    if (isPlaying) {
      Tone.Transport.stop();
      setIsPlaying(false);
    } else {
      Tone.Transport.start('+0.1');
      setIsPlaying(true);
    }
  };

  return (
    <>
      <Button onClick={handlePlay}>{isPlaying ? 'stop' : 'play'}</Button>
    </>
  );
}
