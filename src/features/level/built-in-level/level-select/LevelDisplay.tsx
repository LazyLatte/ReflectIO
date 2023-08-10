import {useState, useEffect, FC} from "react";
import { useAuth } from "@features/authentication";
import {Difficulty, BuiltInLevelInfo} from '@features/level';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StarWhite from '@images/icons/star-white.svg';
import StarYellow from '@images/icons/star-yellow.svg';
import { motion, AnimatePresence } from "framer-motion"
import { useGetClears } from "../api/use-get-clears";

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
  difficulty: Difficulty;
}
export const LevelDisplay: FC<LevelDisplayProps> = ({difficulty}) => { 
  const {data: clears} = useGetClears();
  const [shape, setShape] = useState<Size2D>(window.innerWidth >= 1430 ? {height: 3, width: 5} : {height: 5, width: 3});
  const reshapeLevelArray: null[][] = Array.from(Array(shape.height).fill(
    Array(shape.width).fill(null)
  ));

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
      animate={{boxShadow: `0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem ${frameColor}, 0 0 0.8rem ${frameColor}, 0 0 2rem ${frameColor}, inset 0 0 1.3rem ${frameColor}`}}
      transition= { {duration: 0.7 }}
      style={{
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        border: '2px solid',
        position: 'relative',
        width: `${160*shape.width}px`, 
        height: `${160*shape.height}px`
      }}
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
                {i*shape.width+j < BuiltInLevelInfo[difficulty].length ?
                    <Button 
                      variant='outlined'
                      component={Link}
                      to={`./${difficulty}/${i*shape.width+j+1}`} 
                      state={{
                        difficulty, 
                        levelIdx: i*shape.width+j, 
                        clear: clears!==undefined && Boolean((clears[difficulty] & (1 << (i*shape.width+j))))
                      }}
                      
                      sx={{
                        ...styles.levelBtn, 
                        textShadow: `-2px 0 ${textColor}, 0 2px ${textColor}, 2px 0 ${textColor}, 0 -2px ${textColor}`,
                        boxShadow: `0 0 1px #fff, 0 0 1px #fff, 0 0 10px ${btnFrameColor}, 0 0 4px ${btnFrameColor}, 0 0 14px ${btnFrameColor}, inset 0 0 6px ${btnFrameColor}`
                      }}
                    >
                      <img 
                        src={clears!==undefined && Boolean((clears[difficulty] & (1 << (i*shape.width+j)))) ? StarYellow : StarWhite}
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
