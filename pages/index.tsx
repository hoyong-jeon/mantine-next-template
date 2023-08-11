import React from 'react';

import 'split-pane-react/esm/themes/default.css';
import { createStyles } from '@mantine/core';
import Playground from '@components/Playground';

import usePiano from '~hooks/usePiano';
import useDrumkit from '~hooks/useDrumkit';

const useStyles = createStyles(() => ({
  app: {
    height: '100vh',
    overflow: 'hidden',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  const { piano, isPianoReady } = usePiano();
  const { drumkit, isDrumkitReady } = useDrumkit();
  const isReady = isPianoReady && isDrumkitReady;

  return (
    <div className={classes.app}>
      {isReady && <Playground piano={piano.reverse()} drumkit={drumkit.reverse()} />}
    </div>
  );
}
