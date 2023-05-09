import { useRef, ElementRef } from 'react';
import useImage from 'use-image';
import {useLocation} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import {Difficulty, BuiltInLevelInfo, useLevel, LevelClearModal} from '@features/level';
import { updateClearRecords } from '../api/clear-records';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from "src/hooks/useAxiosPrivate";
import BulbImg from '@images/icons/bulb.svg';
import RestartImg from '@images/icons/restart.svg';

type LevelClearModalHandle = ElementRef<typeof LevelClearModal>;
interface LocationState {difficulty: Difficulty; levelIdx: number};
export const BuiltInLevel = () => {
  const {auth} = useAuth()!;
  const axiosPrivate = useAxiosPrivate(); 
  const {state} = useLocation();
  const {difficulty, levelIdx} = state as LocationState || {difficulty: 'easy', levelIdx: 0};
  const levelInfo = BuiltInLevelInfo[difficulty][levelIdx];
  const level = useLevel(levelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;


  const levelClearModalRef = useRef<LevelClearModalHandle>(null);
  const onClear = async () => {
    if(!levelState.clear){
      
      levelClearModalRef.current?.open(mirrorActions.resetMirrors, difficulty, levelIdx, 3);
      if(auth?.accessToken){
        const data = await updateClearRecords(axiosPrivate, difficulty, levelIdx);
        console.log(data);
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


