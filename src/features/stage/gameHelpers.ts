import {ObjectType, Cell} from './interfaces';
export const ITEMS_BAR_HEIGHT = 4;
export const ITEMS_BAR_WIDTH = 2;
export const MAX_MIRROR_NUM = ITEMS_BAR_HEIGHT * ITEMS_BAR_WIDTH;
export const colorMap = ['rgba(0, 0, 0, 0)', 'rgb(0, 0, 255)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 0)', 'rgb(255, 0, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 255)'];

const mirrorDirections = [
  {x: -1, y: 0},
  {x: -1, y: -1},
  {x: 0, y: -1},
  {x: 1, y: -1},
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 0, y: 1},
  {x: -1, y: 1},
];

export const mirrorDegreeToDirection = (deg: Degree): Vector2D => mirrorDirections[(deg/45)%8];
export const mirrorDirectionToDegree = (nv: Vector2D): Degree => {
  if(nv.x === -1 && nv.y === 0) return 0;
  if(nv.x === -1 && nv.y === -1) return 45;
  if(nv.x === 0 && nv.y === -1) return 90;
  if(nv.x === 1 && nv.y === -1) return 135;
  if(nv.x === 1 && nv.y === 0) return 180;
  if(nv.x === 1 && nv.y === 1) return 225;
  if(nv.x === 0 && nv.y === 1) return 270;
  if(nv.x === -1 && nv.y === 1) return 315;
  return 0;
}

const laserDirections = [
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 0, y: 1},
  {x: -1, y: 1},
  {x: -1, y: 0},
  {x: -1, y: -1},
  {x: 0, y: -1},
  {x: 1, y: -1},
]

export const laserDegreeToDirection = (deg: Degree): Vector2D => laserDirections[(deg/45)%8];
export const laserDirectionToDegree = (dir: Vector2D): Degree =>{
  if(dir.x === 1 && dir.y === 0) return 0;
  if(dir.x === 1 && dir.y === 1) return 45;
  if(dir.x === 0 && dir.y === 1) return 90;
  if(dir.x === -1 && dir.y === 1) return 135;
  if(dir.x === -1 && dir.y === 0) return 180;
  if(dir.x === -1 && dir.y === -1) return 225;
  if(dir.x === 0 && dir.y === -1) return 270;
  if(dir.x === 1 && dir.y === -1) return 315;
  return 0;
}

export const rotate = (deg: Degree, clockwise: boolean, mod: 180 | 360): Degree => {
  const rotateDeg = clockwise ? 45 : 315;
  return (deg + rotateDeg) % mod as Degree;
}

export const createGrid = (height: number, width: number): Cell[][]=> (
  Array(height).fill(
    Array(width).fill({
      object: {
        type: ObjectType.None, 
        dir: {x:0, y:0}, 
        color: 0
      },
      topColor: 0,
      rightColor: 0,
      bottomColor: 0,
      leftColor: 0
    })
  )
) 
