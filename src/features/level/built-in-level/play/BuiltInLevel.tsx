import { useRef } from 'react';
import useImage from 'use-image';
import {useLocation} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import {Difficulty, BuiltInLevelInfo, useLevel} from '@features/level';
import {useAuth, useAxiosPrivate} from '@features/authentication';
import {usePatchClears} from '../api/use-patch-clears';
import LevelClearModal, {LevelClearModalHandle} from './LevelClearModal';
import BulbImg from '@images/icons/bulb.svg';
import RestartImg from '@images/icons/restart.svg';


interface LocationState {difficulty: Difficulty, levelIdx: number};
const BuiltInLevel = () => {
  const {auth} = useAuth()!;
 
  const {state} = useLocation();
  const {difficulty, levelIdx} = state as LocationState || {difficulty: 'easy', levelIdx: 0};
  const levelInfo = BuiltInLevelInfo[difficulty][levelIdx];
  const level = useLevel(levelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;


  const levelClearModalRef = useRef<LevelClearModalHandle>(null);
  const patchClearsMutation = usePatchClears(difficulty, levelIdx);
  const onClear = async () => {
    if(!levelState.clear){
      levelClearModalRef.current?.open(mirrorActions.resetMirrors, difficulty, levelIdx, 3);
      if(auth?.accessToken){
        patchClearsMutation.mutate();
      }
    }
  }

  const [restartImg] = useImage(RestartImg);
  const [bulbImg] = useImage(BulbImg);
  return (
    <>
      <Stage mode={Mode.BuiltIn} level={level} onClear={onClear}>
        <StageButtonGroup 
          gridHeight={levelState.height} 
          gridWidth={levelState.width} 
          btnImg1={restartImg}
          btnImg2={bulbImg} 
          onClick1={mirrorActions.resetMirrors} 
          onClick2={()=>alert('Not support yet')}
        />
      </Stage>
      <LevelClearModal ref={levelClearModalRef}/>
    </>
  )
}

export default BuiltInLevel;