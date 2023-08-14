import React from 'react';

import 'split-pane-react/esm/themes/default.css';
import { createStyles } from '@mantine/core';
import Playground from '@components/Playground';

import useDrumkit from '@hooks/useDrumkit';

const useStyles = createStyles(() => ({
  app: {
    height: '100vh',
    overflow: 'hidden',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  const { drumkit, isDrumkitReady } = useDrumkit();
  const isReady = isDrumkitReady;

  return <div className={classes.app}>{isReady && <Playground drumkit={drumkit.reverse()} />}</div>;
}
