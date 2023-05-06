import * as React from 'react';
import {useState, useEffect, FC, Dispatch, SetStateAction} from "react";
import {DefaultLevels, Size2D} from '../Interfaces';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import StarWhite from '../img/icons/star-white.svg';
import StarYellow from '../img/icons/star-yellow.svg';
import { motion, AnimatePresence } from "framer-motion"

const nextDifficulty = {
  "easy": "normal",
  "normal": "hard",
  "hard": "easy"
}
const theme = {
  "frame": {
    "easy": '#00FF7F',
    "normal": '#bc13fe',
    "hard": '#DC143C'
  },
  "btnFrame":{
    "easy": '#00FA9A',
    "normal": '#8A2BE2',
    "hard": '#B22222'
  },
  "btnText": {
    "easy": '#AFEEEE',
    "normal": '#4dd2ff',
    "hard": '#80bfff'
  }
}

const styles = {
  frame: {
    display:'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    border: '2px solid',

    position: 'relative',
  },
  levelBtn: {
    display:'flex',
    justifyContent:'center',
    height: '100%',
    width: '100%',
    borderRadius: 3,
    padding: '1rem',
    font: '1rem Comic Sans MS',
    fontSize: '3rem',

    position: 'relative'
    
  }
}
interface LevelDisplayProps {
  difficulty: string;
  levels: DefaultLevels;
}
const LevelDisplay: FC<LevelDisplayProps> = ({difficulty, levels}) => {  
  const [shape, setShape] = useState<Size2D>(window.innerWidth >= 1430 ? {height: 3, width: 5} : {height: 5, width: 3});
  const reshapeLevelArray = Array.from(Array(shape.height).fill(
    Array(shape.width).fill('test')
  ));
  const prevDiff: string = nextDifficulty[nextDifficulty[difficulty]];
  const prevFrameColor: string = theme["frame"][prevDiff];
  const frameColor: string = theme["frame"][difficulty];

  const btnFrameColor: string = theme["btnFrame"][difficulty];
  const textColor: string = theme["btnText"][difficulty];


  useEffect(()=>{
    function handleResize() {
      setShape(window.innerWidth >= 1430 ? {height: 3, width: 5} : {height: 5, width: 3});
    };
    window.addEventListener('resize', handleResize);
 
  }, []);
  return (

    <motion.div 
      style={{...styles.frame, width: `${160*shape.width}px`, height: `${160*shape.height}px`}}
      initial={{boxShadow: `0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem ${prevFrameColor}, 0 0 0.8rem ${prevFrameColor}, 0 0 2rem ${prevFrameColor}, inset 0 0 1.3rem ${prevFrameColor}`}}
      animate={{boxShadow: `0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem ${frameColor}, 0 0 0.8rem ${frameColor}, 0 0 2rem ${frameColor}, inset 0 0 1.3rem ${frameColor}`}}
      transition= { {duration: 0.7 }}
    >
      <AnimatePresence>
        <motion.div
          key={difficulty}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition= { {duration: 0.5 }}
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >

        {reshapeLevelArray.map((row, i)=>(
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' key={i}>
            {row.map((_, j)=>(

              <Box height={80} width={80} margin={5} key={j}>
                {i*shape.width+j < levels[difficulty].length ?
                    <Button 
                      component={Link}
                      to={`./${difficulty}/${i*shape.width+j+1}`} 
                      state={{difficulty, levelIdx: i*shape.width+j}}
                      variant='outlined'
                      sx={{
                        ...styles.levelBtn, 
                        textShadow: `-2px 0 ${textColor}, 0 2px ${textColor}, 2px 0 ${textColor}, 0 -2px ${textColor}`,
                        boxShadow: `0 0 1px #fff, 0 0 1px #fff, 0 0 10px ${btnFrameColor}, 0 0 4px ${btnFrameColor}, 0 0 14px ${btnFrameColor}, inset 0 0 6px ${btnFrameColor}`
                      }}
                    >
                      <img 
                        src={levels[difficulty][i*shape.width+j][0].clear ? StarYellow : StarWhite}
                        style={{
                          position: 'absolute',
                          bottom: '4rem',
                          height: '40%',
                          width: '40%'
                        }}
                        
                      />
                        {`${i*shape.width+j+1}`}
                    </Button>
                  :
                  <div style={{height: '100%', width: '100%'}}/>
                }
              </Box>
            ))}
          </Box>
        ))}

        </motion.div>
      </AnimatePresence>
    </motion.div>

  );
}

export default LevelDisplay;