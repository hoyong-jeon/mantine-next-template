import React from 'react';
import * as Tone from 'tone';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

export default function Playground() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isStopped, setIsStopped] = React.useState(false);

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
      <Middle isPlaying={isPlaying} />
      <Bottom
        isPlaying={isPlaying}
        isStopped={isStopped}
        onTogglePlay={handleTogglePlay}
        onStop={handleStop}
      />
    </>
  );
}
