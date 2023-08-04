import { useRef, useState } from 'react';
import { isAxiosError, isCancel } from 'axios';
import useImage from 'use-image';
import {useLocation} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import {Difficulty, BuiltInLevelInfo, useLevel} from '@features/level';
import {usePatchClears} from '../api/use-patch-clears';
import LevelClearModal, {LevelClearModalHandle} from './LevelClearModal';
import {ReLoginModal, ReLoginModalHandle} from '@features/authentication';
import BulbImg from '@images/icons/bulb.svg';
import RestartImg from '@images/icons/restart.svg';


interface LocationState {difficulty: Difficulty, levelIdx: number, clear: boolean};
const BuiltInLevel = () => {
  const {state} = useLocation();
  const {difficulty, levelIdx, clear} = state as LocationState || {difficulty: 'easy', levelIdx: 0, clear: false};
  const levelInfo = BuiltInLevelInfo[difficulty][levelIdx];
  const level = useLevel(levelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const [historyClear, setHistoryClear] = useState<boolean>(clear);

  const levelClearModalRef = useRef<LevelClearModalHandle>(null);
  const reLoginModalRef = useRef<ReLoginModalHandle>(null);
  const patchClearsMutation = usePatchClears();
  const onClear = () => {
    if(!historyClear){
      levelClearModalRef.current?.open();
      patchClearsMutation.mutate({difficulty, idx: levelIdx}, {
        onSuccess: () => {
          setHistoryClear(true);
        },
        onError: (error) => {
          if(isCancel(error)){
            console.log("Guest is playing!");
          }else if(isAxiosError(error)){
              switch(error?.response?.status){
                case 401:
                    reLoginModalRef.current?.open();
                    break;
                default:
                    break;
              }
            }
        }
      });
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
          btn={[
            {
              img: restartImg,
              onClick: mirrorActions.resetMirrors
            },
            {
              img: bulbImg,
              onClick: ()=>alert('Not support yet')
            }
          ]}
        />
      </Stage>
      <LevelClearModal reset={mirrorActions.resetMirrors} difficulty={difficulty} levelIdx={levelIdx} star={3} ref={levelClearModalRef}/>
      <ReLoginModal onLogin={onClear} ref={reLoginModalRef}/>
    </>
  )
}

export default BuiltInLevel;