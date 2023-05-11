import {FC, Dispatch, SetStateAction} from "react";
import { Difficulty, DifficultyDisplay, LevelDisplay } from '@features/level';
import Box from '@mui/material/Box';
import { motion  } from "framer-motion"
interface LevelSelectProps {
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
}

const LevelSelect: FC<LevelSelectProps> = ({difficulty, setDifficulty}) => {  
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0 }}
      transition= { {duration: 0.5 }}
    >
      <Box position='absolute' display='flex' flexDirection='column' flex={1} justifyContent='flex-start' alignItems='center' width='100%' >
        <DifficultyDisplay difficulty={difficulty} setDifficulty={setDifficulty}/>
        <LevelDisplay difficulty={difficulty}/>
      </Box>
    </motion.div>
  );
}

export default LevelSelect;

