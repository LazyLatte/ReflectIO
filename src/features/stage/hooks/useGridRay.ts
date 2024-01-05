import { useState, useLayoutEffect} from "react";
import { createGrid, mirrorDegreeToDirection} from "../gameHelpers";
import {ObjectType, GridRay, Cell, CellObject, Laser, Mirror, Target } from '../interfaces';
interface LoopPotentialMirror{pos: Vector2D; dir: Vector2D;}
interface QueueState {pos: Vector2D, dir: Vector2D, color: Color, loopPotentialMirrors: LoopPotentialMirror[]}
class Grid {
  gridHeight: number;
  gridWidth: number;
  grid: Cell[][];
  constructor(gridHeight: number, gridWidth: number) {
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;

    this.grid = [];
    for(let i=0; i<this.gridHeight; i++){
      const row: Cell[] = [];
      for(let j=0; j<this.gridWidth; j++){
        row.push({
          object: {
            type: ObjectType.None,
            dir: {x:0, y:0},
            color: 0
          }, 
          topColor: 0,
          rightColor: 0,
          bottomColor: 0,
          leftColor: 0
        }); 
      }
      this.grid.push(row);
    }
  }
  positionTransform(pos: Vector2D): Vector2D{return pos;}
  directionTransform(dir: Vector2D): Vector2D{return dir;}
  outOfBound(pos: Vector2D): boolean{
    return (pos.x < 0 || pos.y < 0 || pos.x >= this.gridWidth || pos.y >= this.gridHeight);
  }
  addObject(pos: Vector2D, obj: CellObject){
    const newPos = this.positionTransform(pos);
    this.grid[newPos.y][newPos.x].object = obj;
  }
  loopDetection(pos: Vector2D, dir: Vector2D, loopPotentialMirrors: LoopPotentialMirror[]): boolean{
    let hasLoop: boolean = false;
    loopPotentialMirrors.forEach(mirror => {
      if(mirror.pos.x === pos.x && mirror.pos.y === pos.y && mirror.dir.x === dir.x && mirror.dir.y === dir.y) 
        hasLoop = true;
    })
    return hasLoop;
  }
  pushState(Q: QueueState[], state: QueueState, nextDir: Vector2D, nextColor: Color, loopPotential: boolean){
    Q.unshift({
      pos: {x: state.pos.x + nextDir.x, y: state.pos.y + nextDir.y},
      dir: {x: nextDir.x, y: nextDir.y},
      color: nextColor,
      loopPotentialMirrors: loopPotential ? [...state.loopPotentialMirrors, {
        pos: {x: state.pos.x, y: state.pos.y},
        dir: {x: state.dir.x, y: state.dir.y}
      }] : [...state.loopPotentialMirrors]
    })
  }
  applyColor(pos: Vector2D, dir: Vector2D, color: Color){
    if(dir.x === 1 && dir.y === 0) this.grid[pos.y][pos.x].leftColor |= color; //left
    if(dir.x === 0 && dir.y === -1) this.grid[pos.y][pos.x].bottomColor |= color; // bottom
    if(dir.x === -1 && dir.y === 0) this.grid[pos.y][pos.x].rightColor |= color; //right
    if(dir.x === 0 && dir.y === 1) this.grid[pos.y][pos.x].topColor |= color; //top
  }
  trace(laser: Laser){
    const Q: QueueState[] = [];
    const LaserPos: Vector2D = this.positionTransform(laser.pos);
    const LaserDir: Vector2D = this.directionTransform(laser.dir);
    const initState: QueueState = {pos: {x: LaserPos.x + LaserDir.x, y: LaserPos.y + LaserDir.y}, dir: LaserDir, color: laser.color, loopPotentialMirrors: []};
    this.applyColor(LaserPos, {x: -LaserDir.x, y: -LaserDir.y}, laser.color);
    Q.unshift(initState);

    while(Q.length>0){
      const state = Q.pop() as QueueState;
      const {pos, dir, color, loopPotentialMirrors} = state;

      if(!this.outOfBound(pos)){
        const objType = this.grid[pos.y][pos.x].object.type;

        switch(objType){
          case ObjectType.None:
          case ObjectType.Target:
            // direct pass
            this.applyColor(pos, dir, color);
            this.applyColor(pos, {x: -dir.x, y: -dir.y}, color);
            this.pushState(Q, state, dir, color, false);
            break;
          case ObjectType.Laser:
            this.applyColor(pos, dir, color);
            break;
          case ObjectType.Reflector:
            if(!this.loopDetection(pos, dir, loopPotentialMirrors)){
              const incidentVector = dir;
              const normalVector = this.directionTransform(this.grid[pos.y][pos.x].object.dir);
              const reflectorColor = this.grid[pos.y][pos.x].object.color;
              const nextColor = (color & reflectorColor) as Color;
              const innerProduct = incidentVector.x * normalVector.x + incidentVector.y * normalVector.y;
              if(-incidentVector.x === normalVector.x && -incidentVector.y === normalVector.y){
                // 180 deg reflect
                const reflectVector = normalVector;
                this.pushState(Q, state, reflectVector, nextColor, true);
              }else if(innerProduct < 0){
                // 45 deg reflect
                const reflectVector = {x: incidentVector.x + normalVector.x, y: incidentVector.y + normalVector.y};
                this.pushState(Q, state, reflectVector, nextColor, true);
                this.applyColor(pos, {x: -reflectVector.x, y: -reflectVector.y}, nextColor);
              }
              this.applyColor(pos, dir, color);
            }
            break;
          case ObjectType.Lens:
            if(!this.loopDetection(pos, dir, loopPotentialMirrors)){
              const incidentVector = dir;
              const normalVector = this.directionTransform(this.grid[pos.y][pos.x].object.dir);
              const lensColor = this.grid[pos.y][pos.x].object.color;
              const nextColor = (color & lensColor) as Color;
              const innerProduct = incidentVector.x * normalVector.x + incidentVector.y * normalVector.y;
              if(innerProduct !== 0){

                const reflectVector = (innerProduct < 0) ? {x: incidentVector.x + normalVector.x, y: incidentVector.y + normalVector.y} : {x: incidentVector.x - normalVector.x, y: incidentVector.y - normalVector.y}

                if(reflectVector.x !== 0 || reflectVector.y !==0){
                  this.pushState(Q, state, reflectVector, nextColor, true);
                  this.applyColor(pos, {x: -reflectVector.x, y: -reflectVector.y}, nextColor);
                }
                this.pushState(Q, state, incidentVector, nextColor, true);
                this.applyColor(pos, {x: -incidentVector.x, y: -incidentVector.y}, nextColor);
              }
              this.applyColor(pos, dir, color);
            }
            break;
          default:
            console.log('Unknown object', pos);
            break;
        }
      }
    }
  }
}

class Dgrid extends Grid{
  DgridWidth: number;
  constructor(gridHeight: number, gridWidth: number) {
    super(gridHeight, gridWidth);
    this.DgridWidth = gridHeight + gridWidth + 1;
    this.grid = [];
    for(let i=0; i<this.DgridWidth; i++){
      const row: Cell[] = [];
      for(let j=0; j<this.DgridWidth; j++){
        row.push({
          object: {
            type: ObjectType.None,
            dir: {x:0, y:0},
            color: 0
          }, 
          topColor: 0,
          rightColor: 0,
          bottomColor: 0,
          leftColor: 0
        });
      }
      this.grid.push(row);
    }
  }
   positionTransform(pos: Vector2D): Vector2D{
    // GridPos to DgridPos
    const origin: Vector2D = {x: 1, y: this.gridWidth};
    return {x: pos.x + pos.y + origin.x, y: -pos.x + pos.y + origin.y};
  }
  directionTransform(dir: Vector2D): Vector2D{
    //GridDir to DgridDir
    if(dir.x === 1 && dir.y === 1) return {x: 1, y: 0};
    if(dir.x === 1 && dir.y === -1) return {x: 0, y: -1};
    if(dir.x === -1 && dir.y === 1) return {x: 0, y: 1};
    if(dir.x === -1 && dir.y === -1) return {x: -1, y: 0};
  
    if(dir.x === 1 && dir.y === 0) return {x: 1, y: -1};
    if(dir.x === 0 && dir.y === 1) return {x: 1, y: 1};
    if(dir.x === -1 && dir.y === 0) return {x: -1, y: 1};
    if(dir.x === 0 && dir.y === -1) return {x: -1, y: -1};
    return {x: 0, y: 0};
  }
  outOfBound(pos: Vector2D): boolean{
    const top: number = pos.y;
    const left: number = pos.x;
    const bottom: number = this.DgridWidth - top -1;
    const right: number = this.DgridWidth - left -1;
    return top + left < this.gridWidth || bottom + right < this.gridWidth || top + right < this.gridHeight || left + bottom < this.gridHeight;
  }
}

//---------------------------------------------------------------------------------------------------------------------

export const useGridRay = (height: number, width: number, lasers: Laser[], reflectors: Mirror[], lenses: Mirror[], targets: Target[], setTargetClear: (pos: Vector2D, clear: boolean) => void) => {

  const [gridRay, setGridRay] = useState<GridRay>({
    grid: createGrid(height, width),
    Dgrid: createGrid(height + width + 1, height + width + 1)
  });


  useLayoutEffect(() => {
    
    const calculateGridRay = () => {
      const newGrid = new Grid(height, width);
      const newDgrid = new Dgrid(height, width);

      lasers.forEach(laser => {
        const {pos, dir, color} = laser;
        newGrid.addObject(pos, {type: ObjectType.Laser, dir, color});
        newDgrid.addObject(pos, {type: ObjectType.Laser, dir, color});
      });
      targets.forEach(target => {
        const {pos, color} = target;
        newGrid.addObject(pos, {type: ObjectType.Target, dir: {x:0, y:0}, color});
        newDgrid.addObject(pos, {type: ObjectType.Target, dir: {x:0, y:0}, color});
      });
      reflectors.concat(lenses).filter(mirror => mirror.pos.x >= 0 && mirror.pos.x < width && mirror.pos.y >= 0 && mirror.pos.y < height).forEach(mirror => {
        const {type, pos, deg, color} = mirror;
        newGrid.addObject(pos, {type, dir: mirrorDegreeToDirection(deg), color});
        newDgrid.addObject(pos, {type, dir: mirrorDegreeToDirection(deg), color});
      });

      lasers.forEach(laser => {
        (laser.dir.x === 0 || laser.dir.y === 0) ? newGrid.trace(laser) : newDgrid.trace(laser);
      });

      targets.forEach(target => {
        const targetPos = target.pos;
        const DgridTargetPos = newDgrid.positionTransform(target.pos);
        const centerColor = newGrid.grid[targetPos.y][targetPos.x].topColor | newGrid.grid[targetPos.y][targetPos.x].rightColor | newDgrid.grid[DgridTargetPos.y][DgridTargetPos.x].topColor | newDgrid.grid[DgridTargetPos.y][DgridTargetPos.x].rightColor;
        const isActivated = target.color === centerColor;
        (target.clear !== isActivated) && setTargetClear(target.pos, isActivated);     
      })

      return {
        grid: newGrid.grid,
        Dgrid: newDgrid.grid
      };
    };

    setGridRay(calculateGridRay());

  }, [lasers, reflectors, lenses, targets]);

  return gridRay;
};