import {useState, useCallback } from "react";
import {laserDirectionToDegree, laserDegreeToDirection, ITEMS_BAR_HEIGHT, ITEMS_BAR_WIDTH, MAX_MIRROR_NUM} from '../gameHelpers';
import {Vector2D, UserLevelInfo, LevelInfo, LevelState, MirrorActions,CustomizationTools, Level} from '../Interfaces';
import {ObjectType} from '../Enums';

const getMirrorResetPos = (mirrorIdx: number, itemBarPos: Vector2D, shouldRearrange: boolean): Vector2D => {
  const carry = Math.floor(mirrorIdx / ITEMS_BAR_HEIGHT);
  const digit = mirrorIdx % ITEMS_BAR_HEIGHT;
  const arrange: Vector2D = shouldRearrange ? {x: digit, y: carry} : {x: carry, y: digit};
  return {x: itemBarPos.x + arrange.x, y:  itemBarPos.y + arrange.y};
}
export const useLevel = (level: LevelInfo | UserLevelInfo, shouldRearrange: boolean, customMode: boolean): Level => {
  const {height, width, lasers, targets, reflectorNum, lensNum} = level;
  const itemBarPos: Vector2D = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
  const mirrorResetPos =  [
    Array.from(Array(reflectorNum)).map((e, i)=>getMirrorResetPos(i, itemBarPos, shouldRearrange)),
    Array.from(Array(lensNum)).map((e, i)=>getMirrorResetPos(reflectorNum + i, itemBarPos, shouldRearrange))
  ];
  const [levelState, setLevelState] = useState<LevelState>({
    height,
    width,
    lasers,
    targets: targets.map((target, i)=>({pos: target.pos, color: target.color, clear: false})),
    reflectors: mirrorResetPos[0].map((resetPos, i) => ({
      type: ObjectType.Reflector,
      idx: i,
      pos: resetPos,
      resetPos,
      deg: 0
    })),
    lens: mirrorResetPos[1].map((resetPos, i) => ({
      type: ObjectType.Lens,
      idx: i,
      pos: resetPos,
      resetPos,
      deg: 0
    })),
    clear: false
  });

  const setLevelClear = (clear: boolean) => {
    setLevelState((prev) => ({
      ...prev,
      clear
    }));
  }
  const rotateMirror = (type: ObjectType, idx: number, rotateDeg: number) => {
    setLevelState((prev) => ({
      ...prev,
      reflectors: type === ObjectType.Reflector ? prev.reflectors.map((e, i)=> i===idx ? {...e, deg: e.deg+rotateDeg} : e) : prev.reflectors,
      lens: type === ObjectType.Lens ? prev.lens.map((e, i)=> i===idx ? {...e, deg: e.deg+rotateDeg} : e) : prev.lens
    }));
  };


  const updateMirrorPos = (type: ObjectType, idx: number, pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev, 
      reflectors: type === ObjectType.Reflector ? prev.reflectors.map((e, i)=> i===idx ? {...e, pos} : e) : prev.reflectors,
      lens: type === ObjectType.Lens ? prev.lens.map((e, i)=> i===idx ? {...e, pos} : e) : prev.lens
    }));
  };
  const updateMirrorResetPos = (shouldRearrange: boolean) => {
    const itemBarPos = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
    setLevelState((prev) => ({
      ...prev, 
      reflectors: prev.reflectors.map((e, i)=> ({...e, resetPos: getMirrorResetPos(i, itemBarPos, shouldRearrange)})),
      lens: prev.lens.map((e, i)=>({...e, resetPos: getMirrorResetPos(prev.reflectors.length + i, itemBarPos, shouldRearrange)}))
    }));
  };
  const resetMirrors = useCallback(() => {
    setLevelState((prev)=>({
      ...prev,
      reflectors: prev.reflectors.map((e, i)=> ({...e, pos: e.resetPos, deg: 0})),
      lens: prev.lens.map((e, i) => ({...e, pos: e.resetPos, deg: 0}))
    }));
  }, []);

  const setTargetClear = (pos: Vector2D, clear: boolean) => {
    setLevelState((prev) => ({
      ...prev, 
      targets: prev.targets.map((e, i)=> e.pos.x === pos.x && e.pos.y === pos.y ? {...e, clear} : e)
    }));
  }


  //--------------------------------------------------------------
  const changeStageSize = (size: number) => {
    setLevelState((prev) => ({
      ...prev,
      height: size,
      width: size
    }));
  };


  const addLaser = (pos: Vector2D, color: number) => {
    setLevelState((prev) => ({
      ...prev,
      lasers: [...prev.lasers, {
        pos: pos,
        dir: {x: 1, y: 0},
        color: color
      }]
    }));
  };
  const rotateLaser = (pos: Vector2D, rotateDeg: number) => {
    setLevelState((prev) => ({
      ...prev,
      lasers: prev.lasers.map((e, i)=> e.pos.x === pos.x && e.pos.y === pos.y ? {...e, dir: laserDegreeToDirection(laserDirectionToDegree(e.dir) + rotateDeg)} : e)
    }));
  };
  const deleteLaser = (pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev,
      lasers: prev.lasers.filter((laser) => laser.pos.x !== pos.x || laser.pos.y !== pos.y)
    }));
  };
  const addTarget = (pos: Vector2D, color: number) => {
    setLevelState((prev) => ({
      ...prev,
      targets: [...prev.targets, {
        pos: pos, 
        color: color,
        clear: false
      }]
    }));
  };
  const deleteTarget = (pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev,
      targets: prev.targets.filter((target) => target.pos.x !== pos.x || target.pos.y !== pos.y)
    }));
  };

  const addReflector= (pos: Vector2D, shouldRearrange: boolean) => {
    const itemBarPos = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
    setLevelState((prev) => ({
      ...prev, 
      reflectors: [
        ...prev.reflectors, 
        {
          type: ObjectType.Reflector,
          idx: prev.reflectors.length,
          pos: pos,
          resetPos: getMirrorResetPos(prev.reflectors.length, itemBarPos, shouldRearrange),
          deg: 0
        }
      ],
      lens: prev.lens.map((e, i)=>({...e, resetPos: getMirrorResetPos(prev.reflectors.length + 1 + i, itemBarPos, shouldRearrange)}))
    }));
  };

  const addLens= (pos: Vector2D, shouldRearrange: boolean) => {
    const itemBarPos = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
    setLevelState((prev) => ({
      ...prev, 
      lens: [
        ...prev.lens,
        {
          type: ObjectType.Lens,
          idx: prev.lens.length,
          pos: pos,
          resetPos: getMirrorResetPos(prev.reflectors.length + prev.lens.length, itemBarPos, shouldRearrange),
          deg: 0
        }
      ]
    }));
  };

  const deleteMirror = (type: ObjectType.Reflector | ObjectType.Lens, idx: number) => {
    const itemBarPos = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
    //should change idx too // + shouldrearrange params
    setLevelState((prev) => ({
      ...prev, 
      reflectors: type === ObjectType.Reflector ? prev.reflectors.filter((e, i)=> e.idx !== idx).map((e, i) => ({...e, idx: i, resetPos: getMirrorResetPos(i, itemBarPos, shouldRearrange)})) : prev.reflectors,
      lens: type === ObjectType.Lens ? prev.lens.filter((e, i)=> e.idx !== idx).map((e, i) => ({...e, idx: i, resetPos: getMirrorResetPos(prev.reflectors.length + i, itemBarPos, shouldRearrange)})) : 
                    prev.lens.map((e, i) => ({...e, resetPos: getMirrorResetPos(prev.reflectors.length - 1 + i, itemBarPos, shouldRearrange)}))
    }));
  };
  const mirrorActions: MirrorActions = {rotateMirror, updateMirrorPos, updateMirrorResetPos, resetMirrors};
  const customizationTools: CustomizationTools = customMode ? {changeStageSize, addLaser, rotateLaser, deleteLaser, addTarget, deleteTarget, addReflector, addLens, deleteMirror} : null;
  return [levelState, mirrorActions, setTargetClear, setLevelClear, customizationTools] as const;
};