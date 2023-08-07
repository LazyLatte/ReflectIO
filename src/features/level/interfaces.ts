import {Laser, Target, Vector2D} from '@features/stage';
export interface MirrorState {
  pos: Vector2D;
  deg: number;
}
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
    thumbnail: string;
    personal_best: number | null;
    isFavorite?: number;
}

export type TutorialLevelInfo = LevelInfo & {
  title: string;
  answer: (MirrorState & {idx: number})[];
  text: string[];
}
