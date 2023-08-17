// time is in seconds

export const STEP_WIDTH = 20;
export const NOTE_HEAD_WIDTH = 8;
export const BPM = 80;
export const STEPS_PER_BEAT = 4;
export const TOTAL_TIME = 60;
export const TIME_PER_STEP = TOTAL_TIME / (STEPS_PER_BEAT * BPM);
export const TOTAL_STEPS = (TOTAL_TIME / 60) * STEPS_PER_BEAT * BPM;
export const TOTAL_WIDTH = TOTAL_STEPS * STEP_WIDTH;
