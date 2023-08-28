import React from 'react';
import { createStyles } from '@mantine/core';
import { TOTAL_WIDTH } from '@constants/playground';
import { useRecoilState } from 'recoil';
import { scrollLeftState } from '@atoms/playground';

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

export default function CompositionFooter() {
  const { classes } = useStyles();
  const scrollBarRef = React.useRef<HTMLDivElement | null>(null);
  const [scrollLeft, setScrollLeft] = useRecoilState(scrollLeftState);

  React.useEffect(() => {
    const scrollBar = scrollBarRef.current;
    if (!scrollBar) return;

    const handleScroll = () => {
      if (scrollBar) {
        setScrollLeft(scrollBar.scrollLeft);
      }
    };

    scrollBar.addEventListener('scroll', handleScroll);

    return () => scrollBar.removeEventListener('scroll', handleScroll);
  }, [scrollBarRef.current, setScrollLeft]);

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
