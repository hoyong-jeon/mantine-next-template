import React from 'react';
import { createStyles, UnstyledButton } from '@mantine/core';
import type { Instrument, InstrumentKit, LayerMeta, Note } from '@customTypes/playground';
import GridLines from './GridLines';
import RegionNotes from './RegionNotes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { scaleState } from '@atoms/playground';
import { RHYTHM_SCALE } from '@constants/playground';
import { Frequency } from 'tone';

interface StylesProps {
  highlightColor?: string;
  numUnits: number;
  unitHeight: number;
}

const useStyles = createStyles((theme, { numUnits, highlightColor, unitHeight }: StylesProps) => ({
  lane: {
    position: 'relative',
    height: '100%',
    flex: 1,
  },
  scrollable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    backgroundColor: theme.colors.gray[0],
  },
  keysAndGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 140 + unitHeight * numUnits,
    backgroundColor: theme.colors.gray[0],
  },
  keysWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: '100%',
    backgroundColor: theme.colors.gray[0],
    boxShadow: '2px 0px 2px 0px rgba(0, 0, 0, 0.10)',
    zIndex: 2,
  },
  keys: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    width: '100%',
    height: `calc(${unitHeight}px * ${numUnits})`,
    display: 'flex',
    flexDirection: 'column',
  },
  key: {
    width: '100%',
    height: unitHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 9,
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none',

    ':nth-of-type(7n + 1)': {
      backgroundColor: highlightColor,
    },
    ':nth-of-type(odd)': {
      backgroundColor: theme.colors.gray[3],
    },
    ':nth-of-type(even)': {
      backgroundColor: theme.colors.gray[4],
    },
  },
  grid: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    width: '100%',
    height: `calc(${unitHeight}px * ${numUnits})`,
    borderLeft: '60px solid transparent',
  },
}));

interface Props {
  layerMeta: LayerMeta;
  instrumentKit: InstrumentKit;
}

export default function Lane({ layerMeta, instrumentKit }: Props) {
  const { highlightColor, unitHeight, layerType } = layerMeta;

  const melodyScale = useRecoilValue(scaleState);
  const rhythmScale = RHYTHM_SCALE;

  const scale = layerMeta.layerType === 'melody' ? melodyScale : rhythmScale;
  const numUnits = layerMeta.layerType === 'melody' ? melodyScale.length : rhythmScale.length;

  const { classes } = useStyles({
    numUnits,
    highlightColor,
    unitHeight,
  });

  return (
    <div className={classes.lane}>
      <div className={classes.scrollable}>
        <div className={classes.keysAndGrid}>
          <div className={classes.keysWrapper}>
            <div className={classes.keys}>
              {scale.map((note) => (
                <UnstyledButton
                  key={note}
                  className={classes.key}
                  onClick={() => {
                    const toMidi = Frequency(note as Note).toMidi();
                    const midiToNote = Frequency(toMidi, 'midi').toNote();
                    const inst = instrumentKit[midiToNote as Note];
                    inst.playOnce();
                  }}
                >
                  {note}
                </UnstyledButton>
              ))}
            </div>
          </div>
          <div className={classes.grid}>
            <GridLines
              numUnits={numUnits}
              unitHeight={unitHeight}
              highlightColor={highlightColor}
            />
            <RegionNotes
              instrumentKit={instrumentKit}
              layerType={layerType}
              unitHeight={unitHeight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
