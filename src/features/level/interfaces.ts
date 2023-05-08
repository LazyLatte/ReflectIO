import {LevelInfo, Level} from '@features/stage';

export type UserLevelInfo = LevelInfo & {
    id: string;
    public: boolean;
    clears: number;
    likes: number;
    record: number;
    creator: string;
    timestamp: string;
    personal_best?: number | null;
    isFavorite?: number;
}
  
export interface BuiltInLevels {
    easy: Level[];
    normal: Level[];
    hard: Level[];
}
  