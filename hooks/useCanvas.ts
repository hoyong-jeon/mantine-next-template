import { useEffect, useRef } from 'react';

interface CanvasProps {
  scrollLeft: number;
  onDraw: (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    scrollLeft: number
  ) => void;
}

export const useCanvas = ({ scrollLeft, onDraw }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    let requestId: number;

    const handleResize = () => {
      cancelAnimationFrame(requestId);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      requestId = requestAnimationFrame(draw);
    };

    const draw = () => {
      if (canvas && context) {
        // Retina display support
        const devicePixelRatio = window.devicePixelRatio || 1;
        const backingStoreRatio = 1;
        const ratio = devicePixelRatio / backingStoreRatio;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // Adjust canvas for retina displays
        canvas.width = width * ratio;
        canvas.height = height * ratio;

        // Scale the canvas context
        context.scale(ratio, ratio);

        // Clear canvas
        context.clearRect(0, 0, width, height);

        onDraw(context, canvas, scrollLeft);
      }
    };

    // Initial draw
    draw();

    // Resize event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestId);
    };
  }, [scrollLeft, onDraw]);

  return canvasRef;
};
