import React from 'react';
import * as Tone from 'tone';
import genSynths from '@utils/genSynths';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

interface Props {
  drumkit: any[];
}

export default function Playground({ drumkit }: Props) {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isStopped, setIsStopped] = React.useState(false);

  const piano = genSynths();

  const handleTogglePlay = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      Tone.start();
    }

    if (!isPlaying) {
      setIsPlaying(true);
      Tone.Transport.start();
    } else {
      setIsPlaying(false);
      Tone.Transport.pause();
    }

    setIsStopped(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsStopped(true);
    Tone.Transport.stop();
  };

  return (
    <>
      <Top />
      <Middle piano={piano.reverse()} drumkit={drumkit} isPlaying={isPlaying} />
      <Bottom
        isPlaying={isPlaying}
        isStopped={isStopped}
        onTogglePlay={handleTogglePlay}
        onStop={handleStop}
      />
    </>
  );
}
