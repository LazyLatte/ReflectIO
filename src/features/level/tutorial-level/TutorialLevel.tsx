import { useState, useEffect} from 'react';
import useImage from 'use-image';
import {useLocation, useNavigate, Navigate} from "react-router-dom";
import {Stage, StageButtonGroup, Mode, ObjectType, TutorialGoal} from '@features/stage';
import { TutorialLevelInfo } from '..';
import useLevel from '../hooks/useLevel';
import InstructionModal from './modals/InstructionModal';
import ExclamationImg from '@images/icons/exclamation.svg';
interface LocationState {levelInfo: TutorialLevelInfo};
const TutorialLevel = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  if(!state) return <Navigate to="*" replace />;
  const {levelInfo} = state as LocationState;
  const level = useLevel(levelInfo);
  const [levelState] = level;
  const {answer, text} = levelInfo;

  const [step, setStep] = useState(0);
  const [open, setOpen] = useState<boolean>(true);

  const mirrors = [...levelState.reflectors, ...levelState.lens];
  useEffect(()=>{
    if(step < answer.length * 2){
      let stepComplete: boolean;
      const answerIdx = Math.floor(step / 2);
      const mirrorIdx = answer[answerIdx].idx;
      
      if(step % 2 === 0){
        stepComplete = mirrors[mirrorIdx].pos.x === answer[answerIdx].pos.x && mirrors[mirrorIdx].pos.y === answer[answerIdx].pos.y;
      }else{
        stepComplete = mirrors[mirrorIdx].deg === answer[answerIdx].deg;
      }
      stepComplete && setStep(prev => prev+1);
    }
  }, [levelState.reflectors, levelState.lens])

  const tutorialGoal: TutorialGoal | undefined = (!open && step < answer.length * 2) ? {
    match: step % 2 === 0 ? "pos" : "deg",
    type: answer[Math.floor(step / 2)].idx < levelInfo.reflectorNum ? ObjectType.Reflector : ObjectType.Lens,
    fromPos: mirrors[answer[Math.floor(step / 2)].idx].pos,
    toPos: answer[Math.floor(step / 2)].pos,
    toDeg: answer[Math.floor(step / 2)].deg
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