import React from 'react';
import { createStyles } from '@mantine/core';
import { LayerType } from '@customTypes/playground';
import { STEP_WIDTH, NOTE_HEAD_WIDTH } from '@constants/playground';
import { resolutionState } from '@atoms/playground';
import { useRecoilValue } from 'recoil';

interface StylesProps {
  unitHeight: number;
  layerType: LayerType;
}

const useStyles = createStyles((theme, { unitHeight, layerType }: StylesProps) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: unitHeight,
    backgroundColor: layerType === 'melody' ? theme.colors.teal[5] : theme.colors.cyan[5],
    border: `1px solid ${layerType === 'melody' ? theme.colors.teal[7] : theme.colors.cyan[7]}`,
    borderRadius: 2,
  },
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: NOTE_HEAD_WIDTH,
    height: '100%',
    cursor: 'col-resize',
  },
  selected: {
    backgroundColor: layerType === 'melody' ? theme.colors.teal[6] : theme.colors.cyan[6],
  },
}));

interface Props {
  id: string;
  left: number;
  top: number;
  steps: number;
  layerType: LayerType;
  unitHeight: number;
  onResizeNote: (resizing: boolean) => void;
  onDragNote: (dragging: boolean) => void;
  onEditNote: (id: string, nextLeft: number, nextTop: number, nextSteps: number) => void;
  onDeleteNote: (id: string) => void;
}

export default function FlexNote({
  id,
  left,
  top,
  steps,
  layerType,
  unitHeight,
  onResizeNote,
  onDragNote,
  onEditNote,
  onDeleteNote,
}: Props) {
  const { classes, cx } = useStyles({ unitHeight, layerType });
  const [selected, setSelected] = React.useState(false);
  const resolution = useRecoilValue(resolutionState);

  const handleMouseDownHead = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onResizeNote(true);
      setSelected(true);

      const startX = e.clientX;

      const handleMouseMove = (event: MouseEvent) => {
        const dx = event.clientX - startX;
        const nextSteps = Math.floor(dx / STEP_WIDTH) + steps;
        if (nextSteps < 1) return;
        onEditNote(id, left, top, nextSteps);
      };

      const handleMouseUp = () => {
        onResizeNote(false);
        setSelected(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [onEditNote, id, steps, left, top, resolution]
  );

  const handleMouseDownContainer = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onDragNote(true);
      setSelected(true);

      const startX = e.clientX;
      const startY = e.clientY;

      const handleMouseMove = (event: MouseEvent) => {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        const nextLeft = Math.floor(dx / STEP_WIDTH) * STEP_WIDTH + left;
        const nextTop = Math.floor(dy / unitHeight) * unitHeight + top;

        if (nextLeft < 0 || nextTop < 0) return;
        if (nextLeft === left && nextTop === top) return;

        onEditNote(id, Math.max(0, nextLeft), Math.max(0, nextTop), steps);
      };

      const handleMouseUp = () => {
        onDragNote(false);
        setSelected(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [onEditNote, id, left, steps, top, unitHeight, resolution]
  );

  const handleDoubleClick = React.useCallback(() => {
    onDeleteNote(id);
  }, [onDeleteNote, id, resolution]);

  return (
    <div
      className={cx(classes.container, { [classes.selected]: selected })}
      style={{ left, top, width: steps * STEP_WIDTH }}
      onMouseDown={handleMouseDownContainer}
      onDoubleClick={handleDoubleClick}
    >
      {layerType === 'melody' && <div className={classes.head} onMouseDown={handleMouseDownHead} />}
    </div>
  );
}
