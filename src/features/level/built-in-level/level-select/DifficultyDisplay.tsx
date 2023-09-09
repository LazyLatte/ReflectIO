import {FC, Dispatch, SetStateAction} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import useColorMode from "src/hooks/useColorMode";
import { motion } from "framer-motion";
import { Difficulty } from "..";


const darkTheme = {
  "easy": '#00FF7F',
  "normal": '#bc13fe',
  "hard": '#DC143C'
}
const lightTheme = {
  "easy": '#3CB371',
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
    borderStyle: 'solid',
    borderRadius: '2rem',
    padding: '0.4em',

    fontFamily: ['Orbitron', 'sans-serif'].join(","),
    fontSize: 45,
    fontWeight: 900,
    letterSpacing: 8,
  },
  arrowBtn:{
    margin: '0 40px'
  }
}
//filter: 'drop-shadow(0 0 0.5rem #E0FFFF)'
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
  const {colorMode} = useColorMode()!;
  const nextDifficulty: Difficulty = getNextDifficuly(difficulty);
  const prevDiff: Difficulty = getNextDifficuly(getNextDifficuly(difficulty));
  const arrowIconStyle = {fontSize: '4rem', color: colorMode === 'dark' ? '#E0FFFF' : '#404040'}
  const frameColor = colorMode === 'dark' ? {color: '#fff', borderColor: '#fff', borderWidth: '0.2rem'} : {borderColor: '#fff', borderWidth: '0.4rem'};
  const animate = colorMode === 'dark' ? {
    boxShadow: `0 0 0.8rem ${darkTheme[difficulty]}, inset 0 0 0.8rem ${darkTheme[difficulty]}`,
    textShadow: `0 0 36px ${darkTheme[difficulty]}`
  } : {
    color: lightTheme[difficulty], 
    borderColor: lightTheme[difficulty]
  }
  return (

    <Box
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      marginBottom={15}
    >
      <Button disableRipple sx={styles.arrowBtn} onClick={()=>{setDifficulty(prevDiff)}}>
        <DoubleArrowIcon sx={{...arrowIconStyle, transform: 'rotate(180deg)'}}/>
      </Button>
      <motion.div
        animate={animate}
        style={{...styles.frame, ...frameColor}}
        transition= {{duration: 0.1 }}
      >
          {difficulty.toUpperCase()}
      </motion.div>
      <Button disableRipple sx={styles.arrowBtn} onClick={()=>{setDifficulty(nextDifficulty)}}>
        <DoubleArrowIcon sx={{...arrowIconStyle}} />
      </Button>
    </Box>
    
    
  )
}



