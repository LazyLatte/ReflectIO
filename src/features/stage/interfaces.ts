export enum ObjectType {None, Laser, Target, Reflector, Lens};
export enum Mode {BuiltIn, Custom, Public, Tutorial};
export interface Vector2D {x: number, y: number}
export interface Laser {pos: Vector2D, dir: Vector2D, color: number} 
export interface Mirror {type: ObjectType.Reflector | ObjectType.Lens, idx: number, pos: Vector2D, resetPos: Vector2D, deg: number}
export interface Target {pos: Vector2D, color: number, clear?: boolean}
export interface Object {type: ObjectType, nv?: Vector2D} 
export interface CellRay {object: Object, color: number}
export interface GridRay {grid: CellRay[][], Dgrid: CellRay[][]}

export interface LevelState {  
  height: number;
  width: number;
  lasers: Laser[];
  targets: Target[];
  reflectors: Mirror[];
  lens: Mirror[];
  clear: boolean;
}

export interface LaserActions {
  rotateLaser: (pos: Vector2D, rotateDeg: number) => void;
  updateLaserPos: (prevPos: Vector2D, nextPos: Vector2D) => void;
  deleteLaser: (pos: Vector2D) => void;
}
export interface TargetActions {
  setTargetClear: (pos: Vector2D, clear: boolean) => void;
  updateTargetPos: (prevPos: Vector2D, nextPos: Vector2D) => void;
  deleteTarget: (pos: Vector2D) => void;
}

export interface MirrorActions {
  rotateMirror: (type: ObjectType, idx: number, rotateDeg: number) => void;
  updateMirrorPos: (type: ObjectType, idx: number, pos: Vector2D) => void;
  updateMirrorsResetPos: (shouldRearrange: boolean) => void;
  resetMirrors: () => void;
  deleteMirror: (type: ObjectType.Reflector | ObjectType.Lens, idx: number, shouldRearrange: boolean) => void;
}
export interface AddObjects {
  addLaser: (pos: Vector2D, color: number) => void;
  addTarget: (pos: Vector2D, color: number) => void;
  addMirror: (type: ObjectType.Reflector | ObjectType.Lens, pos: Vector2D, shouldRearrange: boolean) => void;
}
export type SetLevelClear = (clear: boolean) => void;
export type Level = readonly [LevelState, LaserActions, TargetActions, MirrorActions, AddObjects, SetLevelClear];
