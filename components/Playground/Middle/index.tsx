import React from 'react';
import { createStyles, Select, Slider, ThemeIcon, useMantineTheme } from '@mantine/core';
import SplitPane, { Pane } from 'split-pane-react';
import { IconPiano } from '@tabler/icons-react';
import usePiano from '@hooks/usePiano';
import { useRecoilState } from 'recoil';
import { scrollXState } from '@atoms/scroll';
import MiddleHeader from './MiddleHeader';
import CompositionFooter from './CompositionFooter';
import Lane from './Lane';

const useStyles = createStyles((theme) => ({
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
  pane: {
    height: '100%',
    display: 'flex',
  },
  // side
  side: {
    width: 250,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  instControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instControlRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: 144,
  },
  // side end
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

interface Props {
  isPlaying: boolean;
}

export default function Middle({ isPlaying }: Props) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { piano, isPianoReady } = usePiano();

  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);
  const [scrollX, setScrollX] = useRecoilState(scrollXState);

  const handleScrollX = (scrollValue: number) => {
    setScrollX(scrollValue);
  };

  const handleEqualizePane = () => {
    setSizes(['50%', '50%']);
  };

  return (
    <div className={classes.mid}>
      <MiddleHeader
        scrollX={scrollX}
        isPlaying={isPlaying}
        onClickEqualizer={handleEqualizePane}
        onScrollX={handleScrollX}
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
            <div className={classes.side}>
              <div className={classes.instControls}>
                <ThemeIcon variant="light" radius="xl" size={50} color="teal">
                  <IconPiano />
                </ThemeIcon>
                <div className={classes.instControlRight}>
                  <Select
                    placeholder="악기 선택"
                    data={[
                      { value: 'react', label: '피아노' },
                      { value: 'ng', label: '리코더' },
                      { value: 'svelte', label: '신디사이저' },
                      { value: 'vue', label: '바이올린' },
                    ]}
                    size="xs"
                    styles={(t) => ({
                      item: {
                        // applies styles to selected item
                        '&[data-selected]': {
                          '&, &:hover': {
                            backgroundColor:
                              t.colorScheme === 'dark' ? t.colors.teal[9] : t.colors.teal[1],
                            color: t.colorScheme === 'dark' ? t.white : t.colors.teal[9],
                          },
                        },

                        // applies styles to hovered item (with mouse or keyboard)
                        '&[data-hovered]': {},
                      },
                    })}
                  />
                  <Slider size="xs" color="teal" />
                </div>
              </div>
            </div>
            {isPianoReady && (
              <Lane highlightColor={theme.colors.teal[3]} instruments={piano} type="melody" />
            )}
          </Pane>
          <Pane className={classes.pane} style={{ background: '#c0c3c6' }} minSize={100}>
            <div className={classes.side}>
              <div className={classes.instControls}>
                <ThemeIcon variant="light" radius="xl" size={50} color="cyan">
                  <IconPiano />
                </ThemeIcon>
                <div className={classes.instControlRight}>
                  <Select
                    placeholder="악기 선택"
                    data={[
                      { value: 'react', label: '피아노' },
                      { value: 'ng', label: '리코더' },
                      { value: 'svelte', label: '신디사이저' },
                      { value: 'vue', label: '바이올린' },
                    ]}
                    size="xs"
                    styles={(t) => ({
                      item: {
                        // applies styles to selected item
                        '&[data-selected]': {
                          '&, &:hover': {
                            backgroundColor:
                              t.colorScheme === 'dark' ? t.colors.cyan[9] : t.colors.cyan[1],
                            color: t.colorScheme === 'dark' ? t.white : t.colors.cyan[9],
                          },
                        },

                        // applies styles to hovered item (with mouse or keyboard)
                        '&[data-hovered]': {},
                      },
                    })}
                  />
                  <Slider size="xs" color="cyan" />
                </div>
              </div>
            </div>
            <Lane highlightColor={theme.colors.cyan[3]} instruments={[]} type="drums" />
          </Pane>
        </SplitPane>
      </div>
      <CompositionFooter scrollX={scrollX} onScrollX={handleScrollX} />
    </div>
  );
}
