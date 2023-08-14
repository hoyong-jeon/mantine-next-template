import React from 'react';
import { createStyles } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { scrollXState } from '@atoms/scroll';
import { STEP_WIDTH } from '@constants/editor';
import { LayerType } from '@customTypes/editor';
import PlayerEvent from './PlayerEvent';
import SynthEvent from './SynthEvent';
import FlexNote from './FlexNote';

const useStyles = createStyles(() => ({
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
  const { classes } = useStyles();
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
        <FlexNote key={index} x={x - scrollX} y={y} layerType={layerType} unitHeight={unitHeight} />
      ))}
    </div>
  );
}
