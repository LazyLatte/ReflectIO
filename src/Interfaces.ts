import {ObjectType} from './Enums';

export interface Vector2D {x: number;y: number;}
export interface Size2D {height: number; width: number;}
export interface Laser {pos: Vector2D; dir: Vector2D; color: number;} 
export interface Mirror {type: ObjectType.Reflector | ObjectType.Lens; idx: number; pos: Vector2D; resetPos: Vector2D; deg: number;}
export interface Target {pos: Vector2D; color: number; clear?: boolean;}
export interface Object {type: ObjectType; nv?: Vector2D;} 
export interface CellRay {object: Object; color: number;}
export interface GridRay {grid: CellRay[][]; Dgrid: CellRay[][];}


export interface LevelInfo {
  height: number;
  width: number;
  lasers: Laser[];
  targets: Target[];
  reflectorNum: number;
  lensNum: number;
}

export interface UserLevelInfo {
  id: string;
  height: number;
  width: number;
  lasers: Laser[];
  targets: Target[];
  reflectorNum: number;
  lensNum: number;
  public: boolean;
  clears: number;
  likes: number;
  record: number;
  creator: string;
  timestamp: string;
  personal_best?: number | null;
  isFavorite?: number;
}

export interface LevelState {  
  height: number;
  width: number;
  lasers: Laser[];
  targets: Target[];
  reflectors: Mirror[];
  lens: Mirror[];
  clear: boolean;
}
export interface MirrorActions {
  rotateMirror: (type: ObjectType, idx: number, rotateDeg: number) => void;
  updateMirrorPos: (type: ObjectType, idx: number, pos: Vector2D) => void;
  updateMirrorResetPos: (shouldRearrange: boolean) => void;
  resetMirrors: () => void;
}
export type CustomizationTools = {
  changeStageSize: (size: number) => void;
  addLaser: (pos: Vector2D, color: number) => void;
  rotateLaser: (pos: Vector2D, rotateDeg: number) => void;
  deleteLaser: (pos: Vector2D) => void;
  addTarget: (pos: Vector2D, color: number) => void;
  deleteTarget: (pos: Vector2D) => void;
  addReflector: (pos: Vector2D, shouldRearrange: boolean) => void;
  addLens: (pos: Vector2D, shouldRearrange: boolean) => void;
  deleteMirror: (type: ObjectType.Reflector | ObjectType.Lens, idx: number) => void;
} | null;

export type SetLevelClear = (clear: boolean) => void;
export type SetTargetClear = (pos: Vector2D, clear: boolean) => void;
export type Level = readonly [LevelState, MirrorActions, SetTargetClear, SetLevelClear, CustomizationTools];

export interface BuiltInLevels {
  easy: Level[];
  normal: Level[];
  hard: Level[];
}
