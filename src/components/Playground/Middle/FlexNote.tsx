import React from 'react';
import { createStyles } from '@mantine/core';
import { LayerType } from '@customTypes/editor';

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
    cursor: 'default',
  },
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: '100%',
    cursor: 'col-resize',
  },
}));

interface Props {
  x: number;
  y: number;
  layerType: LayerType;
  unitHeight: number;
}

export default function FlexNote({ x, y, layerType, unitHeight }: Props) {
  const { classes } = useStyles({ unitHeight, layerType });

  const regionNotesRef = React.useRef<HTMLDivElement>(null);

  const handleClickRegionNotes = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className={classes.container}
      ref={regionNotesRef}
      onClick={handleClickRegionNotes}
      style={{ left: x, top: y }}
    >
      {layerType === 'melody' && <div className={classes.head} />}
    </div>
  );
}
