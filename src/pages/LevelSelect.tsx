import * as React from 'react';
import {useState, useEffect, FC, Dispatch, SetStateAction} from "react";
import {DefaultLevels} from '../Interfaces';
import DifficultyDisplay from '../components/DifficultyDisplay';
import LevelDisplay from '../components/LevelDisplay';
import Box from '@mui/material/Box';
import { motion  } from "framer-motion"
interface LevelSelectProps {
  difficulty: string;
  setDifficulty: Dispatch<SetStateAction<string>>;
  levels: DefaultLevels;
}

const LevelSelect: FC<LevelSelectProps> = ({difficulty, setDifficulty, levels}) => {  
  
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0 }}
      transition= { {duration: 0.5 }}
    >
      <Box position='absolute' display='flex' flexDirection='column' flex={1} justifyContent='flex-start' alignItems='center' width='100%' >
        <DifficultyDisplay difficulty={difficulty} setDifficulty={setDifficulty}/>
        <LevelDisplay difficulty={difficulty} levels={levels}/>
      </Box>
    </motion.div>
  );
}

export default LevelSelect;

