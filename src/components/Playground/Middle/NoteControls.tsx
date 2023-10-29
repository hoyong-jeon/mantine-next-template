import React from 'react';
import { createStyles, Select, Text, Grid } from '@mantine/core';
import { ROOT_NOTES, SCALE_NAMES } from '@constants/playground';
import { useRecoilState } from 'recoil';
import { rootNoteState, scaleNameState } from '@atoms/playground';
import { ScaleName } from '@customTypes/playground';

const useStyles = createStyles(() => ({
  noteControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
  },
}));

export default function NoteControls() {
  const { classes } = useStyles();

  // const [octave, setOctave] = useRecoilState(octaveState);
  const [rootNote, setRootNote] = useRecoilState(rootNoteState);
  const [scaleName, setScaleName] = useRecoilState(scaleNameState);

  // const octaveMarks = OCTAVES.map((v) => ({ value: Number(v) * 10 + 10, label: v }));
  const scaleOptions = SCALE_NAMES.map((v) => ({ value: v, label: v }));
  const rootOptions = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i.toString(),
        label: ROOT_NOTES[scaleName][i],
      })),
    [scaleName]
  );

  // const octaveValue = React.useMemo(
  //   () => octave.map((v) => Number(v) * 10 + 10) as [number, number],
  //   [octave]
  // );

  // const handleChangeOctave = (value: number[]) => {
  //   const from = (value[0] / 10 - 1).toString() as Octave;
  //   const to = (value[1] / 10 - 1).toString() as Octave;
  //   setOctave([from, to]);
  // };

  const handleSelectRoot = (value: string) => {
    setRootNote(Number(value));
  };

  const handleSelectScale = (value: ScaleName) => {
    setScaleName(value);
  };

  return (
    <div className={classes.noteControls}>
      {/* <Grid align="center" justify="space-between">
        <Grid.Col span={2}>
          <Text size="xs">octave</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <RangeSlider
            size="sm"
            marks={octaveMarks}
            step={10}
            label={(value) => `${(value - 10) / 10}`}
            styles={{
              markLabel: {
                display: 'none',
              },
            }}
            value={octaveValue}
            onChange={handleChangeOctave}
          />
        </Grid.Col>
      </Grid> */}
      <Grid align="center" justify="space-between">
        <Grid.Col span={2}>
          <Text size="xs">root</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Select
            placeholder="choose root"
            data={rootOptions}
            size="xs"
            value={rootNote.toString()}
            onChange={handleSelectRoot}
          />
        </Grid.Col>
      </Grid>
      <Grid align="center" justify="space-between">
        <Grid.Col span={2}>
          <Text size="xs">scale</Text>
        </Grid.Col>
        <Grid.Col span={9}>
          <Select
            placeholder="choose scale"
            data={scaleOptions}
            size="xs"
            value={scaleName}
            onChange={handleSelectScale}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
