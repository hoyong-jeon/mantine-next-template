import React from 'react';
import { createStyles } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { scrollXState } from '@atoms/scroll';
import { STEP_WIDTH } from '@constants/editor';
import { LayerType } from '@customTypes/editor';
import PlayerEvent from './PlayerEvent';
import SynthEvent from './SynthEvent';

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

interface Event {
  x: number;
  y: number;
  event: SynthEvent | PlayerEvent;
}

interface Props {
  layerType: LayerType;
  unitHeight: number;
  instruments: any[];
}

export default function RegionNotes({ layerType, unitHeight, instruments }: Props) {
  const { classes } = useStyles({ unitHeight });
  const scrollX = useRecoilValue(scrollXState);

  //   const [coords, setCoords] = React.useState<{ x: number; y: number }[]>([]);
  const [events, setEvents] = React.useState<Event[]>([]);

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
      const inst = instruments[pitchPosition];

      const newEvent = {
        x: snapX,
        y: snapY,
        event:
          layerType === 'melody'
            ? new SynthEvent(inst.player, timelinePosition, {
                duration: 1,
                note: inst.name,
              })
            : new PlayerEvent(inst.player, timelinePosition, {
                duration: 1,
              }),
      };

      setEvents((prev) => [...prev, newEvent]);

      // console.log(`timelinePosition: ${timelinePosition}, pitchPosition: ${pitchPosition}`);
    },
    [scrollX, unitHeight]
  );

  return (
    <div
      className={classes.regionNotes}
      ref={regionNotesRef}
      onClick={handleClickRegionNotes}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      {events.map(({ x, y }, index) => (
        <div
          key={index}
          className={classes.aNote}
          style={{
            left: x - scrollX,
            top: y,
          }}
        />
      ))}
    </div>
  );
}
