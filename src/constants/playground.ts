import { Kit } from '@customTypes/playground';

export const Resolutions = ['16n', '8n', '4n'] as const;
export const Numerators = ['6', '3'] as const;
export const Denominators = ['16', '8', '4'] as const;

export const NOTE_WIDTH = {
  '16n': 20,
  '8n': 40,
  '4n': 80,
} as const;
export const NOTE_HEAD_WIDTH = 8;

export const RULER_GAP = {
  16: 20,
  8: 40,
  4: 80,
} as const;

export const RHYTHM_DURATION = {
  '16n': 1,
  '8n': 2,
  '4n': 4,
} as const;

export const STEP_WIDTH = NOTE_WIDTH['16n'];
export const STEPS_PER_QUARTER = 4;

export const TOTAL_WIDTH = NOTE_WIDTH['16n'] * 600; // 120000

export const MELODY_KITS = ['piano', 'recorder'] as const;
export const RHYTHM_KITS = ['basic', 'drum', 'gukak'] as const;

export const KITS = [...MELODY_KITS, ...RHYTHM_KITS] as const;

export const KITS_MAP: Record<Kit, string> = {
  piano: '피아노',
  recorder: '리코더',
  drum: '드럼',
  basic: '베이직',
  gukak: '국악',
} as const;

export const SCALE_NAMES = ['major', 'minor'] as const;

export const MAJOR_ROOT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export const MINOR_ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

export const ROOT_NOTES: Record<typeof SCALE_NAMES[number], string[]> = {
  major: MAJOR_ROOT_NOTES,
  minor: MINOR_ROOT_NOTES,
} as const;

export const OCTAVES = ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
