import {useState, useCallback } from "react";
import {Vector2D, Target} from '../Interfaces';
import {ObjectType} from '../Enums';


export const useTarget = (targetInfo) => {
  const [target, setTarget] = useState<Target>({
    pos: targetInfo.pos,
    color: targetInfo.color,
    clear: false
  })
  const setTargetClear = (clear) => {
    setTarget(prev => ({
      ...prev,
      clear
    }));
  }
  return [target, setTargetClear] as const;
};