import React from 'react';
import { createStyles } from '@mantine/core';
import { useRecoilState } from 'recoil';
import * as Tone from 'tone';
import { timeState } from '@atoms/time';

const useStyles = createStyles(() => ({
  timer: {
    marginLeft: 10,
  },
}));

interface Props {
  isPlaying: boolean;
  isStopped: boolean;
}

export default function Timer({ isPlaying, isStopped }: Props) {
  const { classes } = useStyles();

  const [timer, setTimer] = useRecoilState(timeState);

  React.useEffect(() => {
    let frameId: number;

    const updateTimer = () => {
      setTimer(Tone.Transport.seconds.toFixed(1));
      frameId = requestAnimationFrame(updateTimer);
    };

    if (isPlaying) {
      frameId = requestAnimationFrame(updateTimer);
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isPlaying]);

  React.useEffect(() => {
    if (isStopped) {
      setTimer('0');
    }
  }, [isStopped]);

  return <div className={classes.timer}>{timer}</div>;
}
