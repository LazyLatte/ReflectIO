import {Laser, Target} from '@features/stage';
export interface MirrorState {
  pos: Vector2D;
  deg: Degree;
  color: Color;
}

export interface MirrorStates {
  reflectors: MirrorState[];
  lenses: MirrorState[];
}

export interface LevelInfo {
  height: number;
  width: number;
  lasers: Laser[];
  targets: Target[];
  reflectors: Color[];
  lenses: Color[];
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
  isFavorite?: boolean;
}

export type TutorialLevelInfo = LevelInfo & {
  title: string;
  answer: (MirrorState & {idx: number})[];
  text: string[];
}
