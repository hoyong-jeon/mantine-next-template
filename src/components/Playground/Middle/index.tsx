import React from 'react';
import { createStyles, LoadingOverlay } from '@mantine/core';
import SplitPane, { Pane } from 'split-pane-react';
import useMelodyLayer from '@hooks/useMelodyLayer';
import useRhythmLayer from '@hooks/useRhythmLayer';
import MiddleHeader from './MiddleHeader';
import CompositionFooter from './CompositionFooter';
import LayerPaneContent from './LayerPaneContent';

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
  splitter: {
    height: '100%',
    backgroundColor: theme.colors.gray[4],
    borderTop: '1px solid white',
    borderBottom: '1px solid white',
  },
}));

export default function Middle() {
  const { classes } = useStyles();

  const { melodyLayer, isMelodyLayerReady } = useMelodyLayer();
  const { rhythmLayer, isRhythmLayerReady } = useRhythmLayer();

  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);
  const handleEqualizePane = () => setSizes(['50%', '50%']);

  if (melodyLayer === null || !isMelodyLayerReady || rhythmLayer === null || !isRhythmLayerReady) {
    return (
      <div className={classes.mid}>
        <LoadingOverlay visible />
      </div>
    );
  }

  return (
    <div className={classes.mid}>
      <MiddleHeader onClickEqualizer={handleEqualizePane} />
      <div className={classes.compositionArea}>
        <SplitPane
          split="horizontal"
          sizes={sizes}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          sashRender={(index: number, active: boolean) => <div className={classes.splitter} />}
          onChange={(s) => setSizes(s)}
        >
          <Pane className={classes.pane} minSize={100} maxSize={1000}>
            <LayerPaneContent layer={melodyLayer} />
          </Pane>
          <Pane className={classes.pane} minSize={100} maxSize={1000}>
            <LayerPaneContent layer={rhythmLayer} />
          </Pane>
        </SplitPane>
      </div>
      <CompositionFooter />
    </div>
  );
}
