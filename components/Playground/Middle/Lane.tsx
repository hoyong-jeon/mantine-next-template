import React from 'react';
import { createStyles, UnstyledButton } from '@mantine/core';
import GridLines from './GridLines';

interface Instrument {
  name: string;
  player: unknown;
  playFn: () => void;
}

interface Props {
  type: 'melody' | 'drums';
  instruments: Instrument[];
  highlightColor: string;
}

interface StylesProps {
  highlightColor: string;
  numUnits: number;
  unitHeight: number;
}

const useStyles = createStyles((theme, { highlightColor, numUnits, unitHeight }: StylesProps) => ({
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
    backgroundColor: theme.colors.gray[2],
  },
  keysAndGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 140 + 30 * instruments.length,
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
    height: 'calc(30px * 22)',
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
  },
  key: {
    width: '100%',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 800,
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none',

    ':nth-of-type(odd)': {
      backgroundColor: theme.colors.gray[3],
    },
    ':nth-of-type(even)': {
      backgroundColor: theme.colors.gray[4],
    },
    ':nth-of-type(7n + 1)': {
      backgroundColor: highlightColor || theme.colors.gray[4],
    },
  },
  grid: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    width: '100%',
    height: 'calc(30px * 22)',
    borderLeft: '60px solid transparent',
  },
}));

const UNIT_COLOR_TABLE = {
  melody: theme.colors.gray[4],
  drums: theme.colors.gray[5],
};

const UNIT_HEIGHT_TABLE = {
  melody: 30,
  drums: 50,
};

export default function Lane({ type, instruments, highlightColor }: Props) {
  const { classes } = useStyles({
    highlightColor,
    numUnits: instruments.length,
    unitHeight: UNIT_HEIGHT_TABLE[type],
  });

  return (
    <div className={classes.lane}>
      <div className={classes.scrollable}>
        <div className={classes.keysAndGrid}>
          <div className={classes.keysWrapper}>
            <div className={classes.keys}>
              {instruments.map((instrument) => (
                <UnstyledButton
                  key={instrument.name}
                  className={classes.key}
                  onClick={instrument.playFn}
                >
                  {instrument.name}
                </UnstyledButton>
              ))}
            </div>
          </div>
          <div className={classes.grid}>
            <GridLines highlightColor={highlightColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
