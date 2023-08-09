import React from 'react';
import { createStyles } from '@mantine/core';
import { scrollXState } from '@atoms/scroll';
import { STEP_WIDTH } from '@constants/editor';
import { useRecoilValue } from 'recoil';

interface StylesProps {
  unitHeight: number;
}

const useStyles = createStyles((theme, { unitHeight }: StylesProps) => ({
  regionNotes: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    userSelect: 'none',
    touchAction: 'pan-y',
    cursor: 'pointer',
  },
  aNote: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: unitHeight,
    backgroundColor: theme.colors.blue[5],
    borderRadius: 2,
    boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.10)',
  },
}));

interface Props {
  unitHeight: number;
}

export default function RegionNotes({ unitHeight }: Props) {
  const { classes } = useStyles({ unitHeight });
  const scrollX = useRecoilValue(scrollXState);
  //   const [coord, setCoord] = React.useState({ x: 0, y: 0 });
  const [coords, setCoords] = React.useState<{ x: number; y: number }[]>([]);

  const regionNotesRef = React.useRef<HTMLDivElement>(null);

  const handleClickRegionNotes = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const regionNotes = regionNotesRef.current;
      if (!regionNotes) return;

      const offsetX = event.clientX - regionNotes.getBoundingClientRect().left;
      const offsetY = event.clientY - regionNotes.getBoundingClientRect().top;

      const absoluteX = offsetX + scrollX;

      const timelinePosition = Math.floor(absoluteX / STEP_WIDTH);
      const pitchPosition = Math.floor(offsetY / unitHeight);

      const snapX = timelinePosition * STEP_WIDTH;
      const snapY = pitchPosition * unitHeight;

      setCoords([...coords, { x: snapX, y: snapY }]);

      // console.log(`timelinePosition: ${timelinePosition}, pitchPosition: ${pitchPosition}`);
    },
    [coords, scrollX, unitHeight]
  );

  return (
    <div className={classes.regionNotes} ref={regionNotesRef} onClick={handleClickRegionNotes}>
      {coords.map((coord, index) => (
        <div
          key={index}
          className={classes.aNote}
          style={{
            left: coord.x - scrollX,
            top: coord.y,
          }}
        />
      ))}
    </div>
  );
}
