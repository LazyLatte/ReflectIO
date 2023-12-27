import {useState, useCallback } from "react";
import {rotate, laserDirectionToDegree, laserDegreeToDirection, ITEMS_BAR_HEIGHT, MAX_MIRROR_NUM} from '@features/stage';
import {ObjectType, LevelState, LaserActions, TargetActions, MirrorActions, Level, AddObjects} from '@features/stage';
import {TutorialLevelInfo, UserLevelInfo, LevelInfo} from '@features/level'

const useLevel = (level: LevelInfo | UserLevelInfo | TutorialLevelInfo): Level => {
  const {height, width, lasers, targets} = level;
  const reflectorNum = level.reflectors.length;
  //const lensNum = level.lens.length;
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
    reflectors: Array.from(level.reflectors).map((color, i) => {
      const resetPos = getMirrorResetPos(i, false);
      return {
        type: ObjectType.Reflector,
        idx: i,
        pos: resetPos,
        resetPos,
        color,
        deg: 0
      }
    }),
    lenses: Array.from(level.lenses).map((color, i) => {
      const resetPos = getMirrorResetPos(reflectorNum + i, false);
      return {
        type: ObjectType.Lens,
        idx: reflectorNum + i,
        pos: resetPos,
        resetPos,
        color,
        deg: 0
      }
    }),
    clear: false
  });

  const setLevelClear = (clear: boolean) => {
    setLevelState((prev) => ({
      ...prev,
      clear
    }));
  }
  const rotateMirror = (type: ObjectType, idx: number, clockwise: boolean) => {
    setLevelState((prev) => ({
      ...prev,
      reflectors: type === ObjectType.Reflector ? prev.reflectors.map((e, i)=> i===idx ? {...e, deg: rotate(e.deg, clockwise, 360)} : e) : prev.reflectors,
      lenses: type === ObjectType.Lens ? prev.lenses.map((e, i)=> i + prev.reflectors.length === idx ? {...e, deg: rotate(e.deg, clockwise, 180)} : e) : prev.lenses
    }));
  };


  const updateMirrorPos = (type: ObjectType, idx: number, pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev, 
      reflectors: type === ObjectType.Reflector ? prev.reflectors.map((e, i)=> i===idx ? {...e, pos} : e) : prev.reflectors,
      lenses: type === ObjectType.Lens ? prev.lenses.map((e, i)=> i + prev.reflectors.length === idx ? {...e, pos} : e) : prev.lenses
    }));
  };
  const updateMirrorsResetPos = (shouldRearrange: boolean) => {
    setLevelState((prev) => ({
      ...prev, 
      reflectors: prev.reflectors.map((e, i)=> ({...e, resetPos: getMirrorResetPos(i, shouldRearrange)})),
      lenses: prev.lenses.map((e, i)=>({...e, resetPos: getMirrorResetPos(prev.reflectors.length + i, shouldRearrange)}))
    }));
  };
  const resetMirrors = useCallback(() => {
    setLevelState((prev)=>({
      ...prev,
      reflectors: prev.reflectors.map(e => ({...e, pos: e.resetPos, deg: 0})),
      lenses: prev.lenses.map(e => ({...e, pos: e.resetPos, deg: 0}))
    }));
  }, []);

  const setTargetClear = (pos: Vector2D, clear: boolean) => {
    setLevelState((prev) => ({
      ...prev, 
      targets: prev.targets.map(e => e.pos.x === pos.x && e.pos.y === pos.y ? {...e, clear} : e)
    }));
  }


  const addLaser = (pos: Vector2D, color: Color) => {
    setLevelState((prev) => ({
      ...prev,
      lasers: [...prev.lasers, {
        pos: pos,
        dir: {x: 1, y: 0},
        color: color
      }]
    }));
  };
  const rotateLaser = (pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev,
      lasers: prev.lasers.map(e => e.pos.x === pos.x && e.pos.y === pos.y ? {...e, dir: laserDegreeToDirection(rotate(laserDirectionToDegree(e.dir), true, 360))} : e)
    }));
  };
  const updateLaserPos = (prevPos: Vector2D, nextPos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev, 
      lasers: prev.lasers.map(e => e.pos.x === prevPos.x && e.pos.y === prevPos.y ? {...e, pos: nextPos} : e)
    }));
  };

  const deleteLaser = (pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev,
      lasers: prev.lasers.filter(laser => laser.pos.x !== pos.x || laser.pos.y !== pos.y)
    }));
  };
  const addTarget = (pos: Vector2D, color: Color) => {
    setLevelState((prev) => ({
      ...prev,
      targets: [...prev.targets, {
        pos: pos, 
        color: color,
        clear: false
      }]
    }));
  };

  const updateTargetPos = (prevPos: Vector2D, nextPos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev, 
      targets: prev.targets.map(e => e.pos.x === prevPos.x && e.pos.y === prevPos.y ? {...e, pos: nextPos} : e)
    }));
  };

  const deleteTarget = (pos: Vector2D) => {
    setLevelState((prev) => ({
      ...prev,
      targets: prev.targets.filter(target => target.pos.x !== pos.x || target.pos.y !== pos.y)
    }));
  };
  const addMirror = (type: ObjectType.Reflector | ObjectType.Lens, pos: Vector2D, color: Color, shouldRearrange: boolean) => {
    setLevelState((prev) => {
      if(prev.reflectors.length + prev.lenses.length < MAX_MIRROR_NUM){
        return {
          ...prev, 
          reflectors: type === ObjectType.Reflector ? [
            ...prev.reflectors, 
            {
              type: ObjectType.Reflector,
              idx: prev.reflectors.length,
              pos: pos,
              resetPos: getMirrorResetPos(prev.reflectors.length, shouldRearrange),
              color,
              deg: 0
            }
          ] : prev.reflectors,
          lenses: type === ObjectType.Lens ? [
            ...prev.lenses,
            {
              type: ObjectType.Lens,
              idx: prev.reflectors.length + prev.lenses.length,
              pos: pos,
              resetPos: getMirrorResetPos(prev.reflectors.length + prev.lenses.length, shouldRearrange),
              color,
              deg: 0
            }
          ] : prev.lenses.map((e, i) => ({...e, idx: e.idx + 1, resetPos: getMirrorResetPos(prev.reflectors.length + 1 + i, shouldRearrange)}))
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
      lenses: type === ObjectType.Lens ? prev.lenses.filter(e => e.idx !== idx).map((e, i) => ({...e, idx: prev.reflectors.length + i, resetPos: getMirrorResetPos(prev.reflectors.length + i, shouldRearrange)})) : 
                    prev.lenses.map((e, i) => ({...e, idx: e.idx - 1, resetPos: getMirrorResetPos(prev.reflectors.length - 1 + i, shouldRearrange)}))
    }));
  };
  const laserActions: LaserActions = {rotateLaser, updateLaserPos, deleteLaser};
  const targetActions: TargetActions = {setTargetClear, updateTargetPos, deleteTarget};
  const mirrorActions: MirrorActions = {rotateMirror, updateMirrorPos, updateMirrorsResetPos, resetMirrors, deleteMirror};
  const addObjects: AddObjects = {addLaser, addTarget, addMirror};
  return [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] as const;
};

export default useLevel;