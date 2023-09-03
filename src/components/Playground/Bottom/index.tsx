import React from 'react';
import { createStyles, ActionIcon, Group, NumberInput, Text, Divider, Select } from '@mantine/core';
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { playState, numerState, denomState, bpmState, scrollLeftState } from '@atoms/playground';
import { Denominators, Numerators } from '@constants/playground';
import type { Denominator, Numerator } from '@customTypes/playground';
import * as Tone from 'tone';
import Timer from './Timer';

const useStyles = createStyles((theme) => ({
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default function Bottom() {
  const { classes } = useStyles();

  const [numer, setNumer] = useRecoilState(numerState);
  const [denom, setDenom] = useRecoilState(denomState);
  const [bpm, setBpm] = useRecoilState(bpmState);

  const [isInitialized, setIsInitialized] = React.useState(false);
  const [play, setPlay] = useRecoilState(playState);
  const setScrollLeftState = useSetRecoilState(scrollLeftState);

  const handleTogglePlay = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      Tone.start();
    }

    if (play === 'stopped' || play === 'paused') {
      setPlay('playing');
      Tone.Transport.start();
    } else {
      setPlay('paused');
      Tone.Transport.pause();
    }
  };

  const handleStop = () => {
    setPlay('stopped');
    setScrollLeftState(0);
    Tone.Transport.stop();
  };

  const handleChangeBpm = (v: number) => {
    Tone.Transport.bpm.value = v;
    setBpm(v);
  };

  return (
    <div className={classes.bottom}>
      <Group>
        <div className={classes.controls}>
          <ActionIcon
            onClick={handleTogglePlay}
            variant="filled"
            radius="xl"
            color="teal.8"
            size="xl"
          >
            {play !== 'playing' ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
          </ActionIcon>
          <ActionIcon onClick={handleStop} variant="outline" radius="xl" color="gray.6" size="xl">
            <IconPlayerStopFilled />
          </ActionIcon>
        </div>
        <Timer isPlaying={play === 'playing'} isStopped={play === 'stopped'} />
      </Group>
      <Group position="right" spacing="lg">
        <Group>
          <Text>박자:</Text>
          <Select
            w={70}
            value={numer}
            dropdownPosition="top"
            data={Numerators.map((v) => ({
              label: v,
              value: v,
            }))}
            onChange={(v: Numerator) => setNumer(v)}
          />
          /
          <Select
            w={70}
            value={denom}
            dropdownPosition="top"
            data={Denominators.map((v) => ({
              label: v,
              value: v,
            }))}
            onChange={(v: Denominator) => setDenom(v)}
          />
          <Divider orientation="vertical" />
          <Group>
            <Text>BPM:</Text>
            <NumberInput placeholder="bpm" onChange={handleChangeBpm} value={bpm} />
          </Group>
        </Group>
      </Group>
    </div>
  );
}
