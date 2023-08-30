import React from 'react';

import 'split-pane-react/esm/themes/default.css';
import { createStyles } from '@mantine/core';
import Playground from '@components/Playground';

const useStyles = createStyles(() => ({
  app: {
    height: '100vh',
    overflow: 'hidden',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <div className={classes.app}>
      <Playground />
    </div>
  );
}
