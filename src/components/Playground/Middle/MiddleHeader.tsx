import React from 'react';
import { createStyles, Button, ActionIcon } from '@mantine/core';
import useScrollXReactiveCanvas from '@hooks/useScrollXReactiveCanvas';
import { IconEqual } from '@tabler/icons-react';
import * as Tone from 'tone';
import { TOTAL_TIME, TOTAL_WIDTH, STEP_WIDTH, TIME_PER_STEP } from '@constants/editor';

const useStyles = createStyles((theme) => ({
  middleHeader: {
    position: 'relative',
    height: theme.other.middleHeaderHeight,
    backgroundColor: theme.colors.gray[5],
    overflow: 'visible',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  tracklistHeader: {
    display: 'flex',
    height: theme.other.middleHeaderHeight,
    width: 250,
  },
  trackActivator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',

    '&:nth-of-type(1)': {
      backgroundColor: theme.colors.teal[5],
    },
    '&:nth-of-type(2)': {
      backgroundColor: theme.colors.cyan[4],
    },
  },
  compositionHeader: {
    display: 'flex',
    width: 'calc(100% - 250px)',
  },
  equalizerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 60,
    backgroundColor: theme.colors.gray[2],
    boxShadow: '2px 0px 2px 0px rgba(0, 0, 0, 0.10)',
  },
  timelineControls: {
    position: 'relative',
    flex: 1,
    height: theme.other.middleHeaderHeight,
  },
  beatRuler: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  highlightBar: {
    width: '100%',
    height: 20,
    backgroundColor: theme.colors.yellow[4],
  },
  axisCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  playhead: {
    position: 'absolute',
    height: `calc(100vh - ${
      theme.other.topHeight + theme.other.compositionFooterHeight + theme.other.bottomHeight + 20
    }px)`,
    width: 1,
    top: 20,
    left: 0,
    willChange: 'transform',
    pointerEvents: 'none',
  },
  playheadBody: {
    position: 'absolute',
    top: 0,
    left: -0.5,
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.teal[8],
  },
  playheadHead: {
    position: 'absolute',
    top: 0,
    left: -7.5,
    width: 15,
    height: 20,
    backgroundColor: theme.colors.teal[8],
    clipPath: 'polygon(50% 100%, 100% 50%, 100% 0, 0 0, 0 50%)',
  },
}));

interface Props {
  scrollX: number;
  isPlaying: boolean;
  onClickEqualizer: () => void;
  onScrollX: (scrollX: number) => void;
}

export default function MiddleHeader({ scrollX, isPlaying, onClickEqualizer, onScrollX }: Props) {
  const { classes } = useStyles();

  const beatRulerRef = React.useRef<HTMLDivElement>(null);
  const playheadRef = React.useRef<HTMLDivElement>(null);

  const onDraw = React.useCallback(
    (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Draw grid lines
      const gap = 20;
      const numLines = Math.ceil(canvas.clientWidth / gap) + 1;

      for (let i = 0; i < numLines; i += 1) {
        const x = i * gap - (scrollX % gap);
        context.beginPath();

        // Draw number marks
        const mark = Math.floor((i * gap + scrollX) / gap);

        if (mark % 4 === 0) {
          context.moveTo(x, 0);
          context.lineTo(x, canvas.clientHeight);
          context.strokeStyle = '#fff';
          context.stroke();

          const step = mark;
          context.fillStyle = '#fff';
          context.font = 'bold 12px sans-serif';
          context.fillText(step.toString(), x + 4, 12); // Adjust the position as needed
        } else {
          context.moveTo(x, canvas.clientHeight);
          context.lineTo(x, canvas.clientHeight / 2);
          context.strokeStyle = '#fff';
          context.stroke();
        }
      }
    },
    [scrollX]
  );

  const updatePlayhead = React.useCallback(() => {
    const playhead = playheadRef.current;
    const beatRuler = beatRulerRef.current;
    if (!playhead || !beatRuler) return;

    const currentTime = Tone.Transport.seconds;
    const totalTime = TOTAL_TIME;
    const absolutePosition = (currentTime / totalTime) * TOTAL_WIDTH;

    const relativePosition = absolutePosition - scrollX;
    if (relativePosition < 0 || relativePosition > beatRuler.clientWidth) {
      playhead.style.display = 'none';
    } else {
      playhead.style.display = 'block';
      playhead.style.transform = `translateX(${relativePosition}px)`;

      // Scroll to playhead if it's near the edge, only if playing
      if (relativePosition > beatRuler.clientWidth - 50 && isPlaying) {
        onScrollX(scrollX + (beatRuler.clientWidth - 100));
      }
    }
  }, [scrollX, isPlaying]);

  const goToTime = (timelinePosition: number) => {
    const time = timelinePosition * TIME_PER_STEP;
    Tone.Transport.seconds = time;
    updatePlayhead();
  };

  const handleClickRuler = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const beatRuler = beatRulerRef.current;
      if (!beatRuler) return;

      // mouse offset x from ruler
      const offsetX = event.clientX - beatRuler.getBoundingClientRect().left;
      // absolute position of mouse click
      const absolutePosition = offsetX + scrollX;
      // get timeline position based on resolution of STEP_WIDTH
      const timelinePosition = Math.floor(absolutePosition / STEP_WIDTH);
      // get time based on timeline position
      console.log(timelinePosition);
      // go to time
      goToTime(timelinePosition);
    },
    [scrollX]
  );

  React.useEffect(() => {
    let animationFrameId: number;

    if (isPlaying) {
      const loop = () => {
        updatePlayhead();
        animationFrameId = window.requestAnimationFrame(loop);
      };

      loop();
    } else {
      updatePlayhead();
    }

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [scrollX, isPlaying]);

  const canvasRef = useScrollXReactiveCanvas(onDraw);

  return (
    <div className={classes.middleHeader}>
      <div className={classes.tracklistHeader}>
        <div className={classes.trackActivator}>
          <Button color="teal.5" compact>
            멜로디
          </Button>
        </div>
        <div className={classes.trackActivator}>
          <Button color="cyan.4" compact>
            리듬
          </Button>
        </div>
      </div>
      <div className={classes.compositionHeader}>
        <div className={classes.equalizerWrapper}>
          <ActionIcon onClick={onClickEqualizer}>
            <IconEqual />
          </ActionIcon>
        </div>
        <div className={classes.timelineControls} onClick={handleClickRuler}>
          <div className={classes.beatRuler} ref={beatRulerRef}>
            <div className={classes.highlightBar} />
            <canvas className={classes.axisCanvas} ref={canvasRef} />
          </div>
          <div className={classes.playhead} ref={playheadRef}>
            <div className={classes.playheadBody} />
            <div className={classes.playheadHead} />
          </div>
        </div>
      </div>
    </div>
  );
}
