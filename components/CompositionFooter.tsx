import React from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  compositionFooter: {
    position: 'relative',
    left: 250,
    bottom: 0,
    width: 'calc(100% - 250px)',
    height: theme.other.compositionFooterHeight,
    backgroundColor: 'green',
    paddingLeft: 62,
  },
  positionScrollBar: {
    height: 24,
    backgroundColor: theme.colors.gray[1],
    overflowX: 'scroll',

    div: {
      width: 6000,
      height: 1,
    },
  },
}));

interface Props {
  onScroll: (scrollLeft: number) => void;
}

export default function CompositionFooter({ onScroll }: Props) {
  const { classes } = useStyles();
  const scrollBarRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const scrollBar = scrollBarRef.current;

    const handleScroll = () => {
      if (scrollBar) {
        onScroll(scrollBar.scrollLeft);
      }
    };

    scrollBar?.addEventListener('scroll', handleScroll);

    return () => {
      scrollBar?.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div className={classes.compositionFooter}>
      <div className={classes.positionScrollBar} ref={scrollBarRef}>
        <div />
      </div>
    </div>
  );
}
