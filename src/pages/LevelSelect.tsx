import {FC, Dispatch, SetStateAction} from "react";
import MotionPage from "./MotionPage";
import { Difficulty, DifficultyDisplay, LevelDisplay } from '@features/level/built-in-level';
interface LevelSelectProps {
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
}

const LevelSelect: FC<LevelSelectProps> = ({difficulty, setDifficulty}) => {  
  return (
    <MotionPage transitionType="fade" style={{alignItems: 'center'}}>
      <DifficultyDisplay difficulty={difficulty} setDifficulty={setDifficulty}/>
      <LevelDisplay difficulty={difficulty}/>
    </MotionPage>
  );
}

export default LevelSelect;

