import React from 'react';
import * as Tone from 'tone';
import genSynths from '@utils/genSynths';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { scrollLeftState, playState as playStateAtom } from '@atoms/playground';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

interface Props {
  drumkit: any[];
}

export default function Playground({ drumkit }: Props) {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [playState, setPlayState] = useRecoilState(playStateAtom);
  const setScrollLeftState = useSetRecoilState(scrollLeftState);

  const piano = genSynths();

  const handleTogglePlay = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      Tone.start();
    }

    if (playState === 'stopped' || playState === 'paused') {
      setPlayState('playing');
      console.log(Tone.Transport.bpm.get());
      Tone.Transport.start();
    } else {
      setPlayState('paused');
      Tone.Transport.pause();
    }
  };

  const handleStop = () => {
    setPlayState('stopped');
    setScrollLeftState(0);
    Tone.Transport.stop();
  };

  return (
    <>
      <Top />
      <Middle piano={piano.reverse()} drumkit={drumkit} />
      <Bottom onTogglePlay={handleTogglePlay} onStop={handleStop} />
    </>
  );
}
