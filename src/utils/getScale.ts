import { ROOT_NOTES } from '@constants/playground';
import { ScaleName } from '@customTypes/playground';
import { Scale } from 'tonal';

export default function getScale(root: number, scaleName: ScaleName) {
  const rootNote = ROOT_NOTES[scaleName][root];
  const scale = Scale.rangeOf(`${rootNote} ${scaleName}`);

  return scale(`${rootNote}5`, `${rootNote}2`);
}
