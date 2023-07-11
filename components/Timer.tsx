import React from 'react';
import { createStyles } from '@mantine/core';
import * as Tone from 'tone';

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

  const [timer, setTimer] = React.useState('0');

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
