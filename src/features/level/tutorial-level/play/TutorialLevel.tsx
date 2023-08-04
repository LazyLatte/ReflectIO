import { FC, useState, useEffect, useRef } from 'react';
import {useLocation} from "react-router-dom";
import useImage from 'use-image';
import {Stage, StageButtonGroup, Mode, ObjectType} from '@features/stage';
import { TutorialLevelInfo, TutorialGoal, useLevel } from '@features/level';
import {default as InstructionModal, InstructionModalHandle} from './InstructionModal';
import BulbImg from '@images/icons/bulb.svg';
interface LocationState {levelInfo: TutorialLevelInfo};
const TutorialLevel = () => {
  const {state} = useLocation();
  const {levelInfo} = state as LocationState;
  const level = useLevel(levelInfo);
  const [levelState] = level;
  const {answer, text} = levelInfo;

  const [step, setStep] = useState(0);

  useEffect(()=>{
    let stepComplete: boolean;
    const mirrorIdx = Math.floor(step / 2);
    const mirrors = levelState.reflectors.concat(levelState.lens);
    if(step % 2 === 0){
      stepComplete = mirrors[mirrorIdx].pos.x === answer[mirrorIdx].pos.x && mirrors[mirrorIdx].pos.y === answer[mirrorIdx].pos.y;
    }else{
      stepComplete = mirrors[mirrorIdx].deg === answer[mirrorIdx].deg;
    }
    stepComplete && setStep(prev => prev+1);
  }, [levelState.reflectors, levelState.lens])

  const tutorialGoal: TutorialGoal = {
    match: step % 2 === 0 ? "pos" : "deg",
    type: Math.floor(step / 2) < levelInfo.reflectorNum ? ObjectType.Reflector : ObjectType.Lens,
    idx: Math.floor(step / 2) % levelInfo.reflectorNum,
    ...answer[Math.floor(step / 2)]
  }

  
  const [bulbImg] = useImage(BulbImg);
  const instructionModalRef = useRef<InstructionModalHandle>(null);
  return (
    <>
      <Stage mode={Mode.Tutorial} level={level} tutorialGoal={tutorialGoal} onClear={()=>{}}>
        <StageButtonGroup 
          gridHeight={levelState.height} 
          gridWidth={levelState.width} 
          btn={[
            {
              img: bulbImg,
              onClick: () => instructionModalRef.current?.open()
            }
          ]}
        />
      </Stage>
      <InstructionModal instructions={text.split('\n')} ref={instructionModalRef}/>
    </>
  )
}

export default TutorialLevel;