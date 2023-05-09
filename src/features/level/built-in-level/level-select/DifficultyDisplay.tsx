import {FC, Dispatch, SetStateAction} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { motion } from "framer-motion"
import { Difficulty } from "..";


const theme = {
  "easy": '#00FF7F',
  "normal": '#bc13fe',
  "hard": '#DC143C'
}


const styles = {
  frame: {
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
    height: 120,
    width: 360,
    animation: 'pulsate 1.5s infinite alternate',
    border: '0.2rem solid #fff',
    borderRadius: '2rem',
    padding: '0.4em',

    fontFamily: ['Orbitron', 'sans-serif'].join(","),
    fontSize: 45,
    fontWeight: 900,
    letterSpacing: 8,
    color: '#fff'
  },
  arrowBtn:{
    margin: '0 40px'
  },
  arrowIcon: {
    fontSize: '4rem',
    color: '#E0FFFF',
    filter: 'drop-shadow(0 0 0.5rem #E0FFFF)'
  }
}
interface DifficultyDisplayProps {
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
}

const getNextDifficuly = (difficulty: Difficulty): Difficulty => {
  switch(difficulty){
    case 'easy': return 'normal';
    case 'normal': return 'hard';
    case 'hard': return 'easy';
  }
}
export const DifficultyDisplay: FC<DifficultyDisplayProps> = ({difficulty, setDifficulty}) => {
  const nextDifficulty: Difficulty = getNextDifficuly(difficulty);
  const prevDiff: Difficulty = getNextDifficuly(getNextDifficuly(difficulty));
  return (

    <Box
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      marginTop={12}
      marginBottom={15}
    >
      <Button 
        disableRipple
        sx={styles.arrowBtn} 
        onClick={()=>{setDifficulty(prevDiff)}}
      >
        <DoubleArrowIcon sx={{...styles.arrowIcon, transform: 'rotate(180deg)'}}/>
      </Button>
      <motion.div
        style={styles.frame}
        animate={{
          boxShadow: `0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem ${theme[difficulty]}, 0 0 0.8rem ${theme[difficulty]}, inset 0 0 1.3rem ${theme[difficulty]}`,
          textShadow: `0 0 7px #fff, 0 0 10px #fff, 0 0 42px ${theme[difficulty]}, 0 0 82px ${theme[difficulty]}`
        }}
        transition= { {duration: 0.7 }}
      >
          {difficulty.toUpperCase()}
      </motion.div>
      <Button 
        disableRipple
        sx={styles.arrowBtn}  
        onClick={()=>{setDifficulty(nextDifficulty)}}
      >
        <DoubleArrowIcon sx={{...styles.arrowIcon}} />
      </Button>
    </Box>
    
    
  )
}



