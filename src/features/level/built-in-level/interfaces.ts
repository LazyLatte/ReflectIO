import { LevelInfo } from "..";
export type Difficulty = 'easy' | 'normal' | 'hard';

export interface BuiltInLevelInfoInterface {
    easy: LevelInfo[];
    normal: LevelInfo[];
    hard: LevelInfo[];
}
export interface BuiltInLevelClearRecordsInterface {
    easy: number;
    normal: number;
    hard: number;
}
