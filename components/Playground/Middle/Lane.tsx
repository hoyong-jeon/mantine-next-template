import React from 'react';
import { createStyles, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { scrollLeftState } from '@atoms/scroll';
import GridLines from './GridLines';

interface Instrument {
  name: string;
  instrument: unknown;
}

interface Props {
  instruments: Instrument[];
  highlightColor?: string;
}

type StylesProps = Pick<Props, 'highlightColor'>;

const useStyles = createStyles((theme, { highlightColor }: StylesProps) => ({
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
    height: 800,
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

export default function Lane({ instruments, highlightColor }: Props) {
  const { classes } = useStyles({ highlightColor });
  const theme = useMantineTheme();
  const scrollLeft = useRecoilValue(scrollLeftState);

  return (
    <div className={classes.lane}>
      <div className={classes.scrollable}>
        <div className={classes.keysAndGrid}>
          <div className={classes.keysWrapper}>
            <div className={classes.keys}>
              {instruments.map((instrument) => (
                <UnstyledButton key={instrument.name} className={classes.key}>
                  {instrument.name}
                </UnstyledButton>
              ))}
            </div>
          </div>
          <div className={classes.grid}>
            <GridLines scrollLeft={scrollLeft} highlightColor={theme.colors.teal[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}
