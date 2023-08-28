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
  '16': 20,
  '8': 40,
  '4': 80,
} as const;

export const STEP_WIDTH = NOTE_WIDTH['16n'];
export const STEPS_PER_QUARTER = 4;

export const TOTAL_WIDTH = NOTE_WIDTH['16n'] * 600; // 120000
