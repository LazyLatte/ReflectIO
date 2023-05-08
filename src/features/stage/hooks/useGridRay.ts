import { useEffect, useState} from "react";
import { createGrid, mirrorDegreeToNormalVector} from "../gameHelpers";
import {ObjectType, Vector2D, CellRay, GridRay, Laser, Mirror, Target, Object} from '../interfaces';
interface LoopPotentialMirror{pos: Vector2D; dir: Vector2D;}
interface QueueState {pos: Vector2D; dir: Vector2D; loopPotentialMirrors: LoopPotentialMirror[];}
class Grid {
  gridHeight: number;
  gridWidth: number;
  grid: CellRay[][];
  constructor(gridHeight: number, gridWidth: number) {
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;

    this.grid = [];
    for(let i=0; i<this.gridHeight; i++){
      const row = [];
      for(let j=0; j<this.gridWidth; j++){
        row.push({object: {type: ObjectType.None}, color: 0}); // color: MSB -> (top right bottom left) <- LSB
      }
      this.grid.push(row);
    }
  }
  positionTransform(pos: Vector2D): Vector2D{return pos;}
  directionTransform(dir: Vector2D): Vector2D{return dir;}
  outOfBound(pos: Vector2D): boolean{
    return (pos.x < 0 || pos.y < 0 || pos.x >= this.gridWidth || pos.y >= this.gridHeight);
  }
  laserIsPlaced(pos: Vector2D): boolean{
    return this.grid[pos.y][pos.x].object.type === ObjectType.Laser;
  }
  addObject(pos: Vector2D, obj: Object){
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
  pushState(Q: QueueState[], state: QueueState, nextDir: Vector2D, loopPotential: boolean){
    Q.unshift({
      pos: {x: state.pos.x + nextDir.x, y: state.pos.y + nextDir.y},
      dir: {x: nextDir.x, y: nextDir.y},
      loopPotentialMirrors: loopPotential ? [...state.loopPotentialMirrors, {
        pos: {x: state.pos.x, y: state.pos.y},
        dir: {x: state.dir.x, y: state.dir.y}
      }] : [...state.loopPotentialMirrors]
    })
  }
  getColorMask(dir: Vector2D): number{
    if(dir.x === 1 && dir.y === 0) return 0; //left
    if(dir.x === 0 && dir.y === -1) return 3; // bottom
    if(dir.x === -1 && dir.y === 0) return 6; //right
    if(dir.x === 0 && dir.y === 1) return 9; //top
    return 0;
  }
  trace(laser: Laser){
    const Q: QueueState[] = [];
    const LaserPos: Vector2D = this.positionTransform(laser.pos);
    const LaserDir: Vector2D = this.directionTransform(laser.dir);
    const initState: QueueState = {pos: {x: LaserPos.x + LaserDir.x, y: LaserPos.y + LaserDir.y}, dir: LaserDir, loopPotentialMirrors: []};
    this.grid[LaserPos.y][LaserPos.x].color |= (laser.color << this.getColorMask({x: -LaserDir.x, y: -LaserDir.y}));
    Q.unshift(initState);

    while(Q.length>0){
      const state: QueueState = Q.pop() as QueueState;
      const {pos, dir, loopPotentialMirrors} = state;

      if(!this.outOfBound(pos)){
        if(!this.laserIsPlaced(pos)){
          const objType: ObjectType = this.grid[pos.y][pos.x].object.type;

          switch(objType){
            case ObjectType.None:
            case ObjectType.Target:
              // direct pass
              if(Math.abs(dir.x) === 1 && dir.y === 0){
                this.grid[pos.y][pos.x].color |= (laser.color << 6);
                this.grid[pos.y][pos.x].color |= (laser.color << 0);
              }else if(Math.abs(dir.y) === 1 && dir.x === 0){
                this.grid[pos.y][pos.x].color |= (laser.color << 9);
                this.grid[pos.y][pos.x].color |= (laser.color << 3);
              }
              this.pushState(Q, state, dir, false);
              break;
            case ObjectType.Reflector:
              if(!this.loopDetection(pos, dir, loopPotentialMirrors)){
                const incidentVector = dir;
                const normalVector = this.directionTransform(this.grid[pos.y][pos.x].object.nv as Vector2D);
                const innerProduct = incidentVector.x * normalVector.x + incidentVector.y * normalVector.y;
                if(-incidentVector.x === normalVector.x && -incidentVector.y === normalVector.y){
                  // 180 deg reflect
                  const reflectVector = normalVector;
                  this.pushState(Q, state, reflectVector, true);
                }else if(innerProduct < 0){
                  // 45 deg reflect
                  const reflectVector = {x: incidentVector.x + normalVector.x, y: incidentVector.y + normalVector.y};
                  this.pushState(Q, state, reflectVector, true);
                  this.grid[pos.y][pos.x].color |= (laser.color << this.getColorMask({x: -reflectVector.x, y: -reflectVector.y}));
                }
                this.grid[pos.y][pos.x].color |= (laser.color << this.getColorMask(dir));
              }
              break;
            case ObjectType.Lens:
                //should prevent for way loop
                if(!this.loopDetection(pos, dir, loopPotentialMirrors)){
                  const incidentVector = dir;
                  const normalVector = this.directionTransform(this.grid[pos.y][pos.x].object.nv as Vector2D);
                  const innerProduct = incidentVector.x * normalVector.x + incidentVector.y * normalVector.y;

                  if(innerProduct !== 0){

                    const reflectVector = (innerProduct < 0) ? 
                      {x: incidentVector.x + normalVector.x, y: incidentVector.y + normalVector.y} : 
                      {x: incidentVector.x - normalVector.x, y: incidentVector.y - normalVector.y}
        

                    if(reflectVector.x !== 0 || reflectVector.y !==0){
                      this.pushState(Q, state, reflectVector, true);
                      this.grid[pos.y][pos.x].color |= (laser.color << this.getColorMask({x: -reflectVector.x, y: -reflectVector.y}));
                    }
                    this.pushState(Q, state, incidentVector, true);
                    this.grid[pos.y][pos.x].color |= (laser.color << this.getColorMask({x: -incidentVector.x, y: -incidentVector.y}));
                  }
                  this.grid[pos.y][pos.x].color |= (laser.color << this.getColorMask(dir));
                }
              break;
            default:
              console.log('Unknown object', pos);
              break;
          }
        }else{
          this.grid[pos.y][pos.x].color |= (laser.color << this.getColorMask({x: dir.x, y: dir.y}));
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
      const row = [];
      for(let j=0; j<this.DgridWidth; j++){
        row.push({object: {type: ObjectType.None}, color: 0});
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

export const useGridRay = (height: number, width: number, lasers: Laser[], reflectors: Mirror[], lens: Mirror[], targets: Target[], setTargetClear: (pos: Vector2D, clear: boolean) => void) => {

  const [gridRay, setGridRay] = useState<GridRay>({
    grid: createGrid(height, width),
    Dgrid: createGrid(height + width + 1, height + width + 1)
  });


  useEffect(() => {
    
    const calculateGridRay = () => {
      const newGrid = new Grid(height, width);
      const newDgrid = new Dgrid(height, width);

      lasers.forEach(laser => {
        newGrid.addObject(laser.pos, {type: ObjectType.Laser});
        newDgrid.addObject(laser.pos, {type: ObjectType.Laser});
      });
      reflectors.concat(lens).filter(mirror => mirror.pos.x >= 0 && mirror.pos.x < width && mirror.pos.y >= 0 && mirror.pos.y < height).forEach(mirror => {
        const {type, pos, deg} = mirror;
        newGrid.addObject(pos, {type, nv: mirrorDegreeToNormalVector(deg)});
        newDgrid.addObject(pos, {type, nv: mirrorDegreeToNormalVector(deg)});
      });

      lasers.forEach(laser => {
        (laser.dir.x === 0 || laser.dir.y === 0) ? newGrid.trace(laser) : newDgrid.trace(laser);
      });

      targets.forEach(target => {
        const targetPos = target.pos;
        const DgridTargetPos = newDgrid.positionTransform(target.pos);
        const centerColor = (newGrid.grid[targetPos.y][targetPos.x].color & 7) | ((newGrid.grid[targetPos.y][targetPos.x].color >> 3) & 7) | 
                            (newDgrid.grid[DgridTargetPos.y][DgridTargetPos.x].color & 7) | ((newDgrid.grid[DgridTargetPos.y][DgridTargetPos.x].color >> 3) & 7);
        const isActivated = target.color === centerColor;
        (target.clear !== isActivated) && setTargetClear(target.pos, isActivated);     
      })

      return {
        grid: newGrid.grid,
        Dgrid: newDgrid.grid
      };
    };

    setGridRay(calculateGridRay());

  }, [lasers, reflectors, lens, targets.length]);

  return gridRay;
};

export const calculateGridRay = (height: number, width: number, lasers: Laser[], targetHooks: any[]) => {

    const newGrid = new Grid(height, width);
    const newDgrid = new Dgrid(height, width);

    lasers.forEach(laser => {
      newGrid.addObject(laser.pos, {type: ObjectType.Laser});
      newDgrid.addObject(laser.pos, {type: ObjectType.Laser});
    });


    lasers.forEach(laser => {
      if(laser.dir.x === 0 || laser.dir.y === 0)
        newGrid.trace(laser);
      else
        newDgrid.trace(laser);
    });

    targetHooks.forEach(targetHook => {
      const target = targetHook[0];
      const setTargetClear = targetHook[1];
      const targetPos: Vector2D = target.pos;
      const DgridTargetPos: Vector2D = newDgrid.positionTransform(target.pos);
      const centerColor: number = (newGrid.grid[targetPos.y][targetPos.x].color & 7) |
                                  ((newGrid.grid[targetPos.y][targetPos.x].color >> 3) & 7) | 
                                  (newDgrid.grid[DgridTargetPos.y][DgridTargetPos.x].color & 7) | 
                                ((newDgrid.grid[DgridTargetPos.y][DgridTargetPos.x].color >> 3) & 7);
      setTargetClear(target.color === centerColor);
    })

    return {
      grid: newGrid.grid,
      Dgrid: newDgrid.grid
    };

}