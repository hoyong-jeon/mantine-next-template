import React from 'react';
import { createStyles } from '@mantine/core';
import { useCanvas } from '@hooks/useCanvas';

const useStyles = createStyles(() => ({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

interface Props {
  scrollLeft: number;
}

export default function GridLines({ scrollLeft }: Props) {
  const { classes } = useStyles();

  const onDraw = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw grid lines
    const gap = 40;
    const numLines = Math.ceil(canvas.clientWidth / gap) + 1;

    for (let i = 0; i < numLines; i += 1) {
      const x = i * gap - (scrollLeft % gap);
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.clientHeight);
      context.strokeStyle = '#333';
      context.stroke();

      // Draw number marks
      const mark = Math.floor((i * gap + scrollLeft) / gap);
      context.fillStyle = '#fff';
      context.fillText(mark.toString(), x + 2, 12); // Adjust the position as needed
    }
  };

  const canvasRef = useCanvas({ scrollLeft, onDraw });

  return <canvas className={classes.canvas} ref={canvasRef} />;
}
