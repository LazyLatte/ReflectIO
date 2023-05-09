import {useState, useCallback } from "react";
import {laserDirectionToDegree, laserDegreeToDirection, ITEMS_BAR_HEIGHT, MAX_MIRROR_NUM} from '@features/stage';
import {ObjectType, Vector2D, LevelState, LaserActions, TargetActions, MirrorActions, Level, AddObjects} from '@features/stage';
import {UserLevelInfo, LevelInfo} from '@features/level'

export const useLevel = (level: LevelInfo | UserLevelInfo, clear: boolean = false): Level => {
  const {height, width, lasers, targets, reflectorNum, lensNum} = level;
  const getMirrorResetPos = (mirrorIdx: number, shouldRearrange: boolean): Vector2D => {
    const itemBarPos: Vector2D = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
    const carry = Math.floor(mirrorIdx / ITEMS_BAR_HEIGHT);
    const digit = mirrorIdx % ITEMS_BAR_HEIGHT;
    const arrange: Vector2D = shouldRearrange ? {x: digit, y: carry} : {x: carry, y: digit};
    return {x: itemBarPos.x + arrange.x, y:  itemBarPos.y + arrange.y};
  }

  const [levelState, setLevelState] = useState<LevelState>({
    height,
    width,
    lasers,
    targets: targets.map(target => ({...target, clear: false})),
    reflectors: Array.from(Array(reflectorNum)).map((_, i) => {
      const resetPos = getMirrorResetPos(i, false);
      return {
        type: ObjectType.Reflector,
        idx: i,
        pos: resetPos,
        resetPos,
        deg: 0
      }
    }),
    lens:  Array.from(Array(lensNum)).map((_, i) => {
      const resetPos = getMirrorResetPos(reflectorNum + i, false);
      return {
        type: ObjectType.Lens,
        idx: i,
        pos: resetPos,
        resetPos,
        deg: 0
      }
    }),
    clear
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
  const updateMirrorsResetPos = (shouldRearrange: boolean) => {
    setLevelState((prev) => ({
      ...prev, 
      reflectors: prev.reflectors.map((e, i)=> ({...e, resetPos: getMirrorResetPos(i, shouldRearrange)})),
      lens: prev.lens.map((e, i)=>({...e, resetPos: getMirrorResetPos(prev.reflectors.length + i, shouldRearrange)}))
    }));
  };
  const resetMirrors = useCallback(() => {
    setLevelState((prev)=>({
      ...prev,
      reflectors: prev.reflectors.map(e => ({...e, pos: e.resetPos, deg: 0})),
      lens: prev.lens.map(e => ({...e, pos: e.resetPos, deg: 0}))
    }));
  }, []);

  const setTargetClear = (pos: Vector2D, clear: boolean) => {
    setLevelState((prev) => ({
      ...prev, 
      targets: prev.targets.map(e => e.pos.x === pos.x && e.pos.y === pos.y ? {...e, clear} : e)
    }));
  }


  //--------------------------------------------------------------
  // const changeStageSize = (size: number) => {
  //   setLevelState((prev) => ({
  //     ...prev,
  //     height: size,
  //     width: size
  //   }));
  // };


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
      lasers: prev.lasers.map(e => e.pos.x === pos.x && e.pos.y === pos.y ? {...e, dir: laserDegreeToDirection(laserDirectionToDegree(e.dir) + rotateDeg)} : e)
    }));
  };
  const deleteLaser = (pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev,
      lasers: prev.lasers.filter(laser => laser.pos.x !== pos.x || laser.pos.y !== pos.y)
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
      targets: prev.targets.filter(target => target.pos.x !== pos.x || target.pos.y !== pos.y)
    }));
  };
  const addMirror = (type: ObjectType.Reflector | ObjectType.Lens, pos: Vector2D, shouldRearrange: boolean) => {
    setLevelState((prev) => {
      if(prev.reflectors.length + prev.lens.length < MAX_MIRROR_NUM){
        return {
          ...prev, 
          reflectors: type === ObjectType.Reflector ? [
            ...prev.reflectors, 
            {
              type: ObjectType.Reflector,
              idx: prev.reflectors.length,
              pos: pos,
              resetPos: getMirrorResetPos(prev.reflectors.length, shouldRearrange),
              deg: 0
            }
          ] : prev.reflectors,
          lens: type === ObjectType.Lens ? [
            ...prev.lens,
            {
              type: ObjectType.Lens,
              idx: prev.lens.length,
              pos: pos,
              resetPos: getMirrorResetPos(prev.reflectors.length + prev.lens.length, shouldRearrange),
              deg: 0
            }
          ] : prev.lens.map((e, i) => ({...e, resetPos: getMirrorResetPos(prev.reflectors.length + 1 + i, shouldRearrange)}))
        }
      }else{

        return prev;
      }
    });
  }


  const deleteMirror = (type: ObjectType.Reflector | ObjectType.Lens, idx: number, shouldRearrange: boolean) => {
    //should change idx too // + shouldrearrange params
    setLevelState((prev) => ({
      ...prev, 
      reflectors: type === ObjectType.Reflector ? prev.reflectors.filter(e => e.idx !== idx).map((e, i) => ({...e, idx: i, resetPos: getMirrorResetPos(i, shouldRearrange)})) : prev.reflectors,
      lens: type === ObjectType.Lens ? prev.lens.filter(e => e.idx !== idx).map((e, i) => ({...e, idx: i, resetPos: getMirrorResetPos(prev.reflectors.length + i, shouldRearrange)})) : 
                    prev.lens.map((e, i) => ({...e, resetPos: getMirrorResetPos(prev.reflectors.length - 1 + i, shouldRearrange)}))
    }));
  };
  const laserActions: LaserActions = {rotateLaser, deleteLaser};
  const targetActions: TargetActions = {setTargetClear, deleteTarget};
  const mirrorActions: MirrorActions = {rotateMirror, updateMirrorPos, updateMirrorsResetPos, resetMirrors, deleteMirror};
  const addObjects: AddObjects = {addLaser, addTarget, addMirror};
  return [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] as const;
};



  // const addReflector= (pos: Vector2D, shouldRearrange: boolean) => {
  //   const itemBarPos = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
  //   setLevelState((prev) => ({
  //     ...prev, 
  //     reflectors: [
  //       ...prev.reflectors, 
  //       {
  //         type: ObjectType.Reflector,
  //         idx: prev.reflectors.length,
  //         pos: pos,
  //         resetPos: getMirrorResetPos(prev.reflectors.length, itemBarPos, shouldRearrange),
  //         deg: 0
  //       }
  //     ],
  //     lens: prev.lens.map((e, i)=>({...e, resetPos: getMirrorResetPos(prev.reflectors.length + 1 + i, itemBarPos, shouldRearrange)}))
  //   }));
  // };

  // const addLens= (pos: Vector2D, shouldRearrange: boolean) => {
  //   const itemBarPos = shouldRearrange ? {x: 0, y: height+1} : {x: width+1, y: 0};
  //   setLevelState((prev) => ({
  //     ...prev, 
  //     lens: [
  //       ...prev.lens,
  //       {
  //         type: ObjectType.Lens,
  //         idx: prev.lens.length,
  //         pos: pos,
  //         resetPos: getMirrorResetPos(prev.reflectors.length + prev.lens.length, itemBarPos, shouldRearrange),
  //         deg: 0
  //       }
  //     ]
  //   }));
  // };