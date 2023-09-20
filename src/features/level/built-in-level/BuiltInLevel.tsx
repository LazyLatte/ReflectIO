import { useRef, useState} from 'react';
import useImage from 'use-image';
import {useLocation, Navigate} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import {Difficulty} from './interfaces';
import builtInLevelInfo, {updateClears} from './builtInLevelInfo';
import useLevel from '../hooks/useLevel';
import LevelClearModal, {LevelClearModalHandle} from './modals/LevelClearModal';
import RestartImg from '@images/icons/restart.svg';

interface LocationState {difficulty: Difficulty, levelIdx: number};
const BuiltInLevel = () => {
  const {state} = useLocation();
  if(!state) return <Navigate to="*" replace />;

  const {difficulty, levelIdx} = state as LocationState;
  const levelInfo = builtInLevelInfo[difficulty][levelIdx];
  const level = useLevel(levelInfo);
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;
  const [sessionClear, setSessionClear] = useState(false);
  const levelClearModalRef = useRef<LevelClearModalHandle>(null);
  const onClear = () => {
    if(!sessionClear){
      updateClears(difficulty, levelIdx);
      levelClearModalRef.current?.open();
      setSessionClear(true);
    }
  }

  const [restartImg] = useImage(RestartImg);
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
            }
          ]}
        />
      </Stage>
      <LevelClearModal reset={mirrorActions.resetMirrors} difficulty={difficulty} levelIdx={levelIdx} star={3} ref={levelClearModalRef}/>
    </>
  )
}

export default BuiltInLevel;