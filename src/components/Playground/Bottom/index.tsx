import React, { useState } from 'react';
import {
  createStyles,
  ActionIcon,
  Group,
  NumberInput,
  Menu,
  UnstyledButton,
  Slider,
  Text,
  Divider,
  Select,
} from '@mantine/core';
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playState, bpmState, numerState, denomState, resolutionState } from '@atoms/playground';
import Timer from './Timer';
import { Denominators, Numerators, Resolutions } from '@constants/playground';
import type { Denominator, Numerator, Resolution } from '@customTypes/playground';

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

interface Props {
  onTogglePlay: () => void;
  onStop: () => void;
}

export default function Bottom({ onTogglePlay, onStop }: Props) {
  const { classes } = useStyles();
  const play = useRecoilValue(playState);
  const [bpm, setBpm] = useRecoilState(bpmState);
  const [numer, setNumer] = useRecoilState(numerState);
  const [denom, setDenom] = useRecoilState(denomState);
  const [resolution, setResolution] = useRecoilState(resolutionState);

  return (
    <div className={classes.bottom}>
      <Group>
        <div className={classes.controls}>
          <ActionIcon onClick={onTogglePlay} variant="filled" radius="xl" color="teal.8" size="xl">
            {play !== 'playing' ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
          </ActionIcon>
          <ActionIcon onClick={onStop} variant="outline" radius="xl" color="gray.6" size="xl">
            <IconPlayerStopFilled />
          </ActionIcon>
        </div>
        <Timer isPlaying={play === 'playing'} isStopped={play === 'stopped'} />
      </Group>
      <Group position="right" spacing="lg">
        <Group>
          <Text>해상도:</Text>
          <Select
            w={80}
            value={resolution}
            dropdownPosition="top"
            data={Resolutions.map((v) => ({
              label: v,
              value: v,
            }))}
            onChange={(v: Resolution) => setResolution(v)}
          />
        </Group>

        <Divider orientation="vertical" />
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
            <NumberInput placeholder="bpm" onChange={(v: number) => setBpm(v)} value={bpm} />
          </Group>
        </Group>
      </Group>
    </div>
  );
}
