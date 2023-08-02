import { scrollXState } from '@atoms/scroll';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

type OnDraw = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  scrollX: number
) => void;

export default function useScrollXReactiveCanvas(onDraw: OnDraw) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollX = useRecoilValue(scrollXState);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const setCanvas = () => {
      // Retina display support
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Adjust canvas for retina displays
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;

      // Scale the canvas context
      context.scale(devicePixelRatio, devicePixelRatio);

      // Clear canvas
      context.clearRect(0, 0, width, height);
    };

    setCanvas();
    onDraw(context, canvas, scrollX);

    const handleResize = () => {
      setCanvas();
      onDraw(context, canvas, scrollX);
    };

    window.addEventListener('resize', handleResize);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollX, onDraw]);

  return canvasRef;
}
