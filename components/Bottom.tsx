import React from 'react';
import { createStyles, ActionIcon } from '@mantine/core';
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import Timer from './Timer';

const useStyles = createStyles((theme) => ({
  bottom: {
    display: 'flex',
    alignItems: 'center',
    height: theme.other.bottomHeight,
    borderTop: `1px solid ${theme.colors.gray[4]}`,
    padding: '0 20px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
}));

interface Props {
  isPlaying: boolean;
  isStopped: boolean;
  onTogglePlay: () => void;
  onStop: () => void;
}

export default function Bottom({ isPlaying, isStopped, onTogglePlay, onStop }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.bottom}>
      <div className={classes.controls}>
        <ActionIcon onClick={onTogglePlay} variant="filled" radius="xl" color="teal.8" size="xl">
          {!isPlaying ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
        </ActionIcon>
        <ActionIcon onClick={onStop} variant="outline" radius="xl" color="gray.6" size="xl">
          <IconPlayerStopFilled />
        </ActionIcon>
      </div>
      <Timer isPlaying={isPlaying} isStopped={isStopped} />
    </div>
  );
}
