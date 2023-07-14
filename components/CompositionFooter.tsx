import React from 'react';
import { createStyles } from '@mantine/core';
import { TOTAL_WIDTH } from '../constants/editor';

const useStyles = createStyles((theme) => ({
  compositionFooter: {
    width: '100%',
    height: theme.other.compositionFooterHeight,
    backgroundColor: 'white',
    paddingLeft: 310,
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },
  positionScrollBar: {
    height: 24,
    backgroundColor: 'white',
    overflowX: 'scroll',

    div: {
      width: TOTAL_WIDTH,
      height: 1,
    },
  },
}));

interface Props {
  scrollLeft: number;
  onScroll: (scrollLeft: number) => void;
}

export default function CompositionFooter({ scrollLeft, onScroll }: Props) {
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

  React.useEffect(() => {
    const scrollBar = scrollBarRef.current;

    if (scrollBar) {
      scrollBar.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  return (
    <div className={classes.compositionFooter}>
      <div className={classes.positionScrollBar} ref={scrollBarRef}>
        <div />
      </div>
    </div>
  );
}
