import {ObjectType, Vector2D, CellRay} from './interfaces';
export const ITEMS_BAR_HEIGHT = 4;
export const ITEMS_BAR_WIDTH = 2;
export const MAX_MIRROR_NUM = ITEMS_BAR_HEIGHT * ITEMS_BAR_WIDTH;
export const colorMap = ['rgba(0, 0, 0, 0)', 'rgb(0, 0, 255)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 0)', 'rgb(255, 0, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 255)'];

const mirrorNormalVectors = [
  {x: -1, y: 0},
  {x: -1, y: -1},
  {x: 0, y: -1},
  {x: 1, y: -1},
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 0, y: 1},
  {x: -1, y: 1},
];
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
export const mirrorDegreeToNormalVector = (deg: number): Vector2D => mirrorNormalVectors[(deg/45)%8];
export const mirrorNormalVectorToDegree = (nv: Vector2D): number => {
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

export const laserDegreeToDirection = (deg: number): Vector2D => laserDirections[(deg/45)%8];
export const laserDirectionToDegree = (dir: Vector2D): number =>{
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


export const createGrid = (height: number, width: number): CellRay[][]=> (
  Array(height).fill(
    Array(width).fill({
      object: {type: ObjectType.None},
      color: 0 // top right bottom left
    })
  )
) 
