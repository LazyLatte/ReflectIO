import { FC, useState, useEffect} from 'react';
import useImage from 'use-image';
import {useLocation, useNavigate} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import { TutorialLevelInfo, TutorialGoal, useLevel } from '@features/level';
import InstructionModal from './InstructionModal';
import ExclamationImg from '@images/icons/exclamation.svg';
interface LocationState {levelInfo: TutorialLevelInfo};
const TutorialLevel = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {levelInfo} = state as LocationState;
  const level = useLevel(levelInfo);
  const [levelState] = level;
  const {answer, text} = levelInfo;

  const [step, setStep] = useState(0);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(()=>{
    if(step < answer.length * 2){
      let stepComplete: boolean;
      const mirrorIdx = Math.floor(step / 2);
      const mirrors = levelState.reflectors.concat(levelState.lens);
      if(step % 2 === 0){
        stepComplete = mirrors[mirrorIdx].pos.x === answer[mirrorIdx].pos.x && mirrors[mirrorIdx].pos.y === answer[mirrorIdx].pos.y;
      }else{
        stepComplete = mirrors[mirrorIdx].deg === answer[mirrorIdx].deg;
      }
      stepComplete && setStep(prev => prev+1);
    }
  }, [levelState.reflectors, levelState.lens])

  const tutorialGoal: TutorialGoal | undefined = (!open && step < answer.length * 2) ? {
    match: step % 2 === 0 ? "pos" : "deg",
    idx: Math.floor(step / 2),
    ...answer[Math.floor(step / 2)]
  } : undefined;

  
  const [exclamationImg] = useImage(ExclamationImg);
  return (
    <>
      <Stage mode={Mode.Tutorial} level={level} tutorialGoal={tutorialGoal} onClear={() => setOpen(true)}>
        <StageButtonGroup 
          gridHeight={levelState.height} 
          gridWidth={levelState.width} 
          btn={[
            {
              img: exclamationImg,
              onClick: () => setOpen(true)
            }
          ]}
        />
      </Stage>
      <InstructionModal 
        instructions={levelState.clear ? ["Congratulation! You have completed the tutorial!"] : text} 
        open={open} 
        setOpen={setOpen} 
        onDialogFinish={() => {
          levelState.clear && setTimeout(() => {
            navigate(-1)
          }, 800)
        }}
      />
    </>
  )
}

export default TutorialLevel;