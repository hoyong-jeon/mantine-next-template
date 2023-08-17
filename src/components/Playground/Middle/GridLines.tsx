import React from 'react';
import { createStyles, useMantineTheme } from '@mantine/core';
import useScrollLeftReactiveCanvas from '@hooks/useScrollLeftReactiveCanvas';

const useStyles = createStyles(() => ({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // borderTop: `30px solid ${theme.colors.gray[0]}`,
    // borderBottom: `30px solid ${theme.colors.gray[0]}`,
  },
}));

interface Props {
  numUnits: number;
  unitHeight: number;
  highlightColor?: string;
}

export default function GridLines({ numUnits, unitHeight, highlightColor }: Props) {
  const { classes } = useStyles();

  const theme = useMantineTheme();

  const onDraw = React.useCallback(
    (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scrollLeft: number) => {
      const laneWidth = canvas.clientWidth;
      const laneColors = [theme.colors.gray[3], theme.colors.gray[4]];

      for (let i = 0; i < numUnits; i += 1) {
        const y = i * unitHeight;
        const color = laneColors[i % 2];
        context.fillStyle = color;
        context.fillRect(0, y, laneWidth, unitHeight);
      }

      if (highlightColor) {
        for (let i = 0; i < numUnits; i += 7) {
          const y = i * unitHeight;
          context.fillStyle = highlightColor;
          context.fillRect(0, y, laneWidth, unitHeight);
        }
      }

      // Draw grid lines
      const gap = 20;
      const numLines = Math.ceil(canvas.clientWidth / gap) + 1;

      for (let i = 0; i < numLines; i += 1) {
        const x = i * gap - (scrollLeft % gap);
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.clientHeight);
        context.strokeStyle = theme.colors.gray['0'];
        context.stroke();

        // Draw number marks
        // const mark = Math.floor((i * gap + scrollLeft) / gap);
        // context.fillStyle = '#fff';
        // context.fillText(mark.toString(), x + 2, 12);
      }
    },
    [highlightColor]
  );

  const canvasRef = useScrollLeftReactiveCanvas(onDraw);

  return <canvas className={classes.canvas} ref={canvasRef} />;
}
