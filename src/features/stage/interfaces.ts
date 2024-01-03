export enum ObjectType {None, Laser, Target, Reflector, Lens};
export enum Mode {BuiltIn, Custom, Public, Tutorial};
export interface Laser {pos: Vector2D, dir: Vector2D, color: Color} 
export interface Mirror {type: ObjectType.Reflector | ObjectType.Lens, idx: number, pos: Vector2D, resetPos: Vector2D, color: Color, deg: Degree}
export interface Target {pos: Vector2D, color: Color, clear?: boolean}
export interface CellObject {type: ObjectType, dir: Vector2D, color: Color} 
export interface Cell {object: CellObject, topColor: Color, rightColor: Color, bottomColor: Color, leftColor: Color}
export interface GridRay {grid: Cell[][], Dgrid: Cell[][]}

export interface LevelState {  
  height: number;
  width: number;
  lasers: Laser[];
  targets: Target[];
  reflectors: Mirror[];
  lenses: Mirror[];
  clear: boolean;
}

export interface LaserActions {
  rotateLaser: (pos: Vector2D) => void;
  updateLaserPos: (prevPos: Vector2D, nextPos: Vector2D) => void;
  deleteLaser: (pos: Vector2D) => void;
}
export interface TargetActions {
  setTargetClear: (pos: Vector2D, clear: boolean) => void;
  updateTargetPos: (prevPos: Vector2D, nextPos: Vector2D) => void;
  deleteTarget: (pos: Vector2D) => void;
}

export interface MirrorActions {
  rotateMirror: (type: ObjectType, idx: number, clockwise: boolean) => void;
  updateMirrorPos: (type: ObjectType, idx: number, pos: Vector2D) => void;
  updateMirrorsResetPos: (shouldRearrange: boolean) => void;
  resetMirrors: () => void;
  deleteMirror: (type: ObjectType.Reflector | ObjectType.Lens, idx: number, shouldRearrange: boolean) => void;
}
export interface AddObjects {
  addLaser: (pos: Vector2D, color: Color) => void;
  addTarget: (pos: Vector2D, color: Color) => void;
  addMirror: (type: ObjectType.Reflector | ObjectType.Lens, pos: Vector2D, color: Color, shouldRearrange: boolean) => void;
}
export type SetLevelClear = (clear: boolean) => void;
export type Level = readonly [LevelState, LaserActions, TargetActions, MirrorActions, AddObjects, SetLevelClear];

export interface TutorialGoal {
  match: "pos" | "deg";
  type: ObjectType.Reflector | ObjectType.Lens;
  fromPos: Vector2D;
  toPos: Vector2D;
  toDeg: number;
}
