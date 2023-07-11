import React from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { createStyles } from '@mantine/core';
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
    backgroundColor: theme.colors.gray[2],
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
    height: 2000,
  },
  keys: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: '100%',
    cursor: 'default',
    zIndex: 2,
    backgroundColor: 'red',
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderLeft: '60px solid transparent',
    backgroundColor: 'black',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  const [sizes, setSizes] = React.useState<(number | string)[]>(['auto']);
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

  return (
    <div className={classes.app}>
      <div className={classes.top}>
        <Image src="/logo.svg" alt="logo" width={106} height={36} />
      </div>
      <div className={classes.mid}>
        <MiddleHeader scrollLeft={scrollLeft} isPlaying={isPlaying} />
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
                    <div className={classes.keys} />
                    <div className={classes.grid}>
                      <GridLines scrollLeft={scrollLeft} />
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
                    <div className={classes.keys} />
                    <div className={classes.grid} />
                  </div>
                </div>
              </div>
            </Pane>
          </SplitPane>
        </div>
        <CompositionFooter onScroll={handleScroll} />
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
