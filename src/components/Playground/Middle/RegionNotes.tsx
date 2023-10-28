import React from 'react';
import { createStyles } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { scrollLeftState, resolutionState, scaleState } from '@atoms/playground';
import { RHYTHM_DURATION, RHYTHM_SCALE, STEP_WIDTH } from '@constants/playground';
import { InstrumentKit, LayerType, Note } from '@customTypes/playground';
import { Frequency, Sampler } from 'tone';
import RhythmEvent from './RhythmEvent';
import MelodyEvent from './MelodyEvent';
import FlexNote from './FlexNote';
import MelodyInstrument from './MelodyInstrument';
import RhythmInstrument from './RhythmInstrument';

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
  id: string;
  left: number;
  top: number;
  steps: number;
  event: MelodyEvent | RhythmEvent;
}

interface Props {
  layerType: LayerType;
  unitHeight: number;
  instrumentKit: InstrumentKit;
}

export default function RegionNotes({ layerType, unitHeight, instrumentKit }: Props) {
  const { classes } = useStyles();
  const scrollLeft = useRecoilValue(scrollLeftState);
  const resolution = useRecoilValue(resolutionState);

  const melodyScale = useRecoilValue(scaleState);
  const rhythmScale = RHYTHM_SCALE;

  const scale = layerType === 'melody' ? melodyScale : rhythmScale;

  //   const [coords, setCoords] = React.useState<{ x: number; y: number }[]>([]);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const regionNotesRef = React.useRef<HTMLDivElement>(null);
  const noteIdRef = React.useRef(0);

  const handleMouseDownRegionNotes = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const regionNotes = regionNotesRef.current;
      if (!regionNotes) return;

      const offsetX = event.clientX - regionNotes.getBoundingClientRect().left;
      const offsetY = event.clientY - regionNotes.getBoundingClientRect().top;

      const absoluteX = offsetX + scrollLeft;

      const timelinePosition = Math.floor(absoluteX / STEP_WIDTH);
      const pitchPosition = Math.floor(offsetY / unitHeight);

      const snapLeft = timelinePosition * STEP_WIDTH;
      const snapTop = pitchPosition * unitHeight;

      const toMidi = Frequency(scale[pitchPosition] as Note).toMidi();
      const midiToNote = Frequency(toMidi, 'midi').toNote();
      const inst = instrumentKit[midiToNote as Note];

      const newEvent: Event = {
        id: `${layerType}-${noteIdRef.current}`,
        left: snapLeft,
        top: snapTop,
        steps: STEP_WIDTH / STEP_WIDTH,
        event:
          layerType === 'melody'
            ? new MelodyEvent(inst, timelinePosition, {
                duration: STEP_WIDTH / STEP_WIDTH,
              })
            : new RhythmEvent(inst, timelinePosition, {
                duration: RHYTHM_DURATION[resolution],
              }),
      };

      setEvents((prev) => [...prev, newEvent]);
      noteIdRef.current += 1;

      // console.log(`timelinePosition: ${timelinePosition}, pitchPosition: ${pitchPosition}`);
    },
    [scrollLeft, unitHeight, resolution, instrumentKit, layerType, scale]
  );

  const handleEditNote = React.useCallback(
    (id: string, nextLeft: number, nextTop: number, nextSteps: number) => {
      const absoluteLeft = nextLeft + scrollLeft;
      const timelinePosition = Math.floor(absoluteLeft / STEP_WIDTH);
      const pitchPosition = Math.floor(nextTop / unitHeight);

      const toMidi = Frequency(scale[pitchPosition] as Note).toMidi();
      const midiToNote = Frequency(toMidi, 'midi').toNote();
      const inst = instrumentKit[midiToNote as Note];

      setEvents((prev) =>
        prev.map((e) => {
          if (e.id === id) {
            if (e.event instanceof MelodyEvent) {
              e.event.update(inst as MelodyInstrument, timelinePosition, {
                duration: nextSteps,
              });
            } else if (e.event instanceof RhythmEvent) {
              e.event.update(inst as RhythmInstrument, timelinePosition, {
                duration: RHYTHM_DURATION[resolution],
              });
            }

            const nextEvent = {
              ...e,
              left: nextLeft,
              top: nextTop,
              steps: nextSteps,
            };

            return nextEvent;
          }
          return e;
        })
      );
    },
    [resolution, scrollLeft, unitHeight, instrumentKit, scale]
  );

  const handleDeleteNote = React.useCallback(
    (id: string) => {
      setEvents((prev) =>
        prev.filter((e) => {
          if (e.id === id) {
            e.event.delete();
            return false;
          }
          return true;
        })
      );
    },
    [setEvents]
  );

  const handleResizeNote = (resizing: boolean) => setIsResizing(resizing);
  const handleDragNote = (dragging: boolean) => setIsDragging(dragging);

  React.useEffect(() => {
    const regionNotes = regionNotesRef.current;
    if (!regionNotes) return;

    if (isResizing) {
      regionNotes.style.cursor = 'col-resize';
    } else {
      regionNotes.style.cursor = 'pointer';
    }
  }, [isResizing]);

  React.useEffect(() => {
    const regionNotes = regionNotesRef.current;
    if (!regionNotes) return;

    if (isDragging) {
      regionNotes.style.cursor = 'grabbing';
    } else {
      regionNotes.style.cursor = 'pointer';
    }
  }, [isDragging]);

  React.useEffect(() => {
    // update events instrument
    setEvents((prev) =>
      prev.map((e) => {
        const pitchPosition = Math.floor(e.top / unitHeight);

        const toMidi = Frequency(scale[pitchPosition] as Note).toMidi();
        const midiToNote = Frequency(toMidi, 'midi').toNote();
        const inst = instrumentKit[midiToNote as Note];

        if (e.event instanceof MelodyEvent) {
          e.event.updateInstrument(inst as MelodyInstrument);
        } else if (e.event instanceof RhythmEvent) {
          e.event.updateInstrument(inst as RhythmInstrument);
        }

        return e;
      })
    );
  }, [instrumentKit, scale, unitHeight]);

  return (
    <div
      className={classes.regionNotes}
      ref={regionNotesRef}
      onMouseDown={handleMouseDownRegionNotes}
    >
      {events.map(({ id, left, top, steps }, index) => (
        <FlexNote
          key={index}
          id={id}
          left={left - scrollLeft}
          top={top}
          steps={steps}
          layerType={layerType}
          unitHeight={unitHeight}
          onResizeNote={handleResizeNote}
          onDragNote={handleDragNote}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      ))}
    </div>
  );
}
