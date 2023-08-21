import React from 'react';
import { createStyles, ActionIcon } from '@mantine/core';
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { playState as playStateAtom } from '@atoms/play';
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
  onTogglePlay: () => void;
  onStop: () => void;
}

export default function Bottom({ onTogglePlay, onStop }: Props) {
  const { classes } = useStyles();
  const playState = useRecoilValue(playStateAtom);

  return (
    <div className={classes.bottom}>
      <div className={classes.controls}>
        <ActionIcon onClick={onTogglePlay} variant="filled" radius="xl" color="teal.8" size="xl">
          {playState !== 'playing' ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
        </ActionIcon>
        <ActionIcon onClick={onStop} variant="outline" radius="xl" color="gray.6" size="xl">
          <IconPlayerStopFilled />
        </ActionIcon>
      </div>
      <Timer isPlaying={playState === 'playing'} isStopped={playState === 'stopped'} />
    </div>
  );
}
