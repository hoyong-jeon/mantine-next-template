import React from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { UnstyledButton, createStyles, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import Bottom from '@components/Bottom';
import * as Tone from 'tone';
import GridLines from '../components/GridLines';
import CompositionFooter from '../components/CompositionFooter';
import MiddleHeader from '../components/MiddleHeader';

const useStyles = createStyles((theme) => ({
  app: {
    height: '100vh',
    overflow: 'hidden',
  },
  pane: {
    height: '100%',
    display: 'flex',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    height: theme.other.topHeight,
    backgroundColor: theme.colors.teal[8],
    padding: '0 20px',
  },
  mid: {
    position: 'relative',
    height: `calc(100% - ${theme.other.topHeight + theme.other.bottomHeight}px)`,
  },
  compositionArea: {
    position: 'relative',
    height: `calc(100% - ${
      theme.other.middleHeaderHeight + theme.other.compositionFooterHeight
    }px)`,
  },
  side: {
    width: 250,
    height: '100%',
    backgroundColor: 'white',
  },
  splitter: {
    height: '100%',
    backgroundColor: theme.colors.gray[4],
    borderTop: '1px solid white',
    borderBottom: '1px solid white',
  },
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
  },
  keyHighlightTeal: {
    ':nth-of-type(7n + 1)': {
      backgroundColor: theme.colors.teal[3],
    },
  },
  keyHighlightCyan: {
    ':nth-of-type(7n + 1)': {
      backgroundColor: theme.colors.cyan[3],
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

// c major scale 3 octaves
const KEY_MAP = {
  1: '도',
  2: '레',
  3: '미',
  4: '파',
  5: '솔',
  6: '라',
  7: '시',
  8: '도',
  9: '레',
  10: '미',
  11: '파',
  12: '솔',
  13: '라',
  14: '시',
  15: '도',
  16: '레',
  17: '미',
  18: '파',
  19: '솔',
  20: '라',
  21: '시',
  22: '도',
};

export default function HomePage() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isStopped, setIsStopped] = React.useState(false);

  const handleTogglePlay = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      Tone.start();
    }

    if (!isPlaying) {
      setIsPlaying(true);
      Tone.Transport.start();
    } else {
      setIsPlaying(false);
      Tone.Transport.pause();
    }

    setIsStopped(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsStopped(true);
    Tone.Transport.stop();
  };

  const handleScroll = (scrollValue: number) => {
    setScrollLeft(scrollValue);
  };

  const handleEqualizePane = () => {
    setSizes(['50%', '50%']);
  };

  return (
    <div className={classes.app}>
      <div className={classes.top}>
        <Image src="/logo.svg" alt="logo" width={106} height={36} />
      </div>
      <div className={classes.mid}>
        <MiddleHeader
          scrollLeft={scrollLeft}
          isPlaying={isPlaying}
          onClickEqualizer={handleEqualizePane}
          onScrollLeft={handleScroll}
        />
        <div className={classes.compositionArea}>
          <SplitPane
            split="horizontal"
            sizes={sizes}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sashRender={(index: number, active: boolean) => <div className={classes.splitter} />}
            onChange={(s) => setSizes(s)}
          >
            <Pane className={classes.pane} style={{ background: '#ddd' }} minSize={100}>
              <div className={classes.side} />
              <div className={classes.lane}>
                <div className={classes.scrollable}>
                  <div className={classes.keysAndGrid}>
                    <div className={classes.keysWrapper}>
                      <div className={classes.keys}>
                        {Object.entries(KEY_MAP)
                          .reverse()
                          .map(([keyCode, key]) => (
                            <UnstyledButton
                              key={keyCode}
                              className={cx(classes.key, classes.keyHighlightTeal)}
                            >
                              {key}
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
            </Pane>
            <Pane className={classes.pane} style={{ background: '#c0c3c6' }} minSize={100}>
              <div className={classes.side} />
              <div className={classes.lane}>
                <div className={classes.scrollable}>
                  <div className={classes.keysAndGrid}>
                    <div className={classes.keysWrapper}>
                      <div className={classes.keys}>
                        {Object.entries(KEY_MAP)
                          .reverse()
                          .map(([keyCode, key]) => (
                            <UnstyledButton
                              key={keyCode}
                              className={cx(classes.key, classes.keyHighlightCyan)}
                            >
                              {key}
                            </UnstyledButton>
                          ))}
                      </div>
                    </div>
                    <div className={classes.grid}>
                      <GridLines scrollLeft={scrollLeft} highlightColor={theme.colors.cyan[3]} />
                    </div>
                  </div>
                </div>
              </div>
            </Pane>
          </SplitPane>
        </div>
        <CompositionFooter scrollLeft={scrollLeft} onScroll={handleScroll} />
      </div>
      <Bottom
        isPlaying={isPlaying}
        isStopped={isStopped}
        onTogglePlay={handleTogglePlay}
        onStop={handleStop}
      />
    </div>
  );
}
