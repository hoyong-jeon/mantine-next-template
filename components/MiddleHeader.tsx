import React from 'react';
import { createStyles, Button, ActionIcon } from '@mantine/core';
import { useCanvas } from '@hooks/useCanvas';
import { IconEqual } from '@tabler/icons-react';

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
  playhead: {},
}));

interface Props {
  scrollLeft: number;
}

export default function MiddleHeader({ scrollLeft }: Props) {
  const { classes } = useStyles();

  const onDraw = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw grid lines
    const gap = 40;
    const numLines = Math.ceil(canvas.clientWidth / gap) + 1;

    for (let i = 0; i < numLines; i += 1) {
      const x = i * gap - (scrollLeft % gap);
      context.beginPath();

      // Draw number marks
      const mark = Math.floor((i * gap + scrollLeft) / gap);

      if (mark % 4 === 0) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas.clientHeight);
        context.strokeStyle = '#fff';
        context.stroke();

        const step = mark / 4;
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
  };

  const canvasRef = useCanvas({ scrollLeft, onDraw });

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
          <ActionIcon>
            <IconEqual />
          </ActionIcon>
        </div>
        <div className={classes.timelineControls}>
          <div className={classes.beatRuler}>
            <div className={classes.highlightBar} />
            <canvas className={classes.axisCanvas} ref={canvasRef} />
          </div>
        </div>
      </div>
      <div className={classes.playhead}></div>
    </div>
  );
}
