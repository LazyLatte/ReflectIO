import {Laser, Target} from '@features/stage';

export interface LevelInfo {
    height: number;
    width: number;
    lasers: Laser[];
    targets: Target[];
    reflectorNum: number;
    lensNum: number;
  }

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
  
