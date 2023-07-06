import React from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { createStyles } from '@mantine/core';
import GridLines from '../components/GridLines';
import CompositionFooter from '../components/CompositionFooter';
import MiddleHeader from '../components/MiddleHeader';
// test
const useStyles = createStyles((theme) => ({
  app: {
    height: '100vh',
  },
  pane: {
    height: '100%',
    display: 'flex',
  },
  top: {
    height: theme.other.topHeight,
    backgroundColor: theme.colors.teal[6],
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
  bottom: {
    height: theme.other.bottomHeight,
    borderTop: `1px solid ${theme.colors.gray[4]}`,
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
    borderTop: '5px solid white',
    borderBottom: '5px solid white',
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
    width: 62,
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
    borderLeft: '62px solid transparent',
    backgroundColor: 'black',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  const [sizes, setSizes] = React.useState<(number | string)[]>(['auto']);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleScroll = (scrollValue: number) => {
    setScrollLeft(scrollValue);
  };

  return (
    <div className={classes.app}>
      <div className={classes.top}>Top</div>
      <div className={classes.mid}>
        <MiddleHeader scrollLeft={scrollLeft} />
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

      <div className={classes.bottom}>Bottom</div>
    </div>
  );
}
