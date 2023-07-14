import React from 'react';
import { createStyles, MantineTheme } from '@mantine/core';
import { useCanvas } from '@hooks/useCanvas';

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

const onDraw = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  scrollLeft: number,
  theme: MantineTheme,
  highlightColor: string
) => {
  // Draw horizontal lanes
  // each lane is 30px tall
  // colors should be black and white alternating
  // the number of lanes is 7 * 3 + 1 = 22
  const numLanes = 22;
  const laneHeight = 30;
  const laneWidth = canvas.clientWidth;
  const laneColors = [theme.colors.gray[3], theme.colors.gray[4]];
  const hightlightColor = highlightColor;

  for (let i = 0; i < numLanes; i += 1) {
    const y = i * laneHeight;
    const color = i % 7 === 0 ? hightlightColor : laneColors[i % 2];
    context.fillStyle = color;
    context.fillRect(0, y, laneWidth, laneHeight);
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
};

interface Props {
  scrollLeft: number;
  highlightColor: string;
}

export default function GridLines({ scrollLeft, highlightColor }: Props) {
  const { classes } = useStyles();

  const canvasRef = useCanvas({ scrollLeft, onDraw, highlightColor });

  return <canvas className={classes.canvas} ref={canvasRef} />;
}
