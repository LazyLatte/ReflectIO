import {useState, useEffect, FC} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Difficulty} from '..';
import builtInLevelInfo, {getClears} from "../builtInLevelInfo";
import useColorMode from "src/hooks/useColorMode";
import StarWhite from '@images/icons/star-white.svg';
import StarYellow from '@images/icons/star-yellow.svg';
interface DifficultyColor {
  easy: string,
  normal: string,
  hard: string
}
interface DisplayStyle {
  frame: DifficultyColor,
  btnFrame:DifficultyColor,
  btnText: DifficultyColor,
  btnHover: DifficultyColor
}
const theme: {
  dark: DisplayStyle,
  light: DisplayStyle
} = {
  dark: {
    frame: {
      "easy": '#00FF7F',
      "normal": '#bc13fe',
      "hard": '#DC143C'
    },
    btnFrame:{
      "easy": '#00FA9A',
      "normal": '#8A2BE2',
      "hard": '#B22222'
    },
    btnHover:{
      "easy": '',
      "normal": '',
      "hard": ''
    },
    btnText: {
      "easy": '#AFEEEE',
      "normal": '#87CEEB',
      "hard": '#80bfff'
    }
  },

  light: {
    frame: {
      "easy": '#3CB371',
      "normal": '#9932CC',
      "hard": '#c12525'
    },
    btnFrame:{
      "easy": '#00cc7e',
      "normal": '#9370DB',
      "hard": '#d2143a'
    },
    btnHover:{
      "easy": '#00fa9a',
      "normal": '#b299e6',
      "hard": '#ee4466'
    },
    btnText: {
      "easy": '#AFEEEE',
      "normal": '#87CEEB',
      "hard": '#80bfff'
    }
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
    position: 'relative',
    transition: "background 0.5s",
  }
}
interface LevelDisplayProps {
  difficulty: Difficulty;
}
export const LevelDisplay: FC<LevelDisplayProps> = ({difficulty}) => { 
  const clears = getClears(difficulty);
  const {colorMode} = useColorMode()!;
  const [shape, setShape] = useState<Size2D>(window.innerWidth >= 1430 ? {height: 3, width: 5} : {height: 5, width: 3});
  const reshapeLevelArray: null[][] = Array.from(Array(shape.height).fill(
    Array(shape.width).fill(null)
  ));

  const frameColor: string = theme[colorMode]["frame"][difficulty];
  const btnFrameColor: string = theme[colorMode]["btnFrame"][difficulty];
  const btnHoverColor: string = theme[colorMode]["btnHover"][difficulty];
  const textColor: string = theme[colorMode]["btnText"][difficulty];

  const frameStyle = colorMode === 'dark' ? {borderColor: 'white'} : {};
  const btnStyle = colorMode === 'dark' ? {
    border: '1px solid white',
    boxShadow: `0 0 4px ${btnFrameColor}, 0 0 10px ${btnFrameColor}, inset 0 0 6px ${btnFrameColor}`,
    ':hover': {
      borderColor: 'white',
      bgcolor: '#1e2943'
    }
  } : {
    backgroundColor: btnFrameColor,
    ':hover': {
      bgcolor: btnHoverColor
    }
  }
  
  const animate = colorMode === 'dark' ? {
    borderWidth: '3px', 
    boxShadow: `0 0 0.8rem ${frameColor}, 0 0 0.8rem ${frameColor}, inset 0 0 1rem ${frameColor}`,
  } : {
    borderColor: frameColor,
    borderWidth: '7px', 
  }

  useEffect(()=>{
    window.addEventListener('resize', () => {
      setShape(window.innerWidth >= 1430 ? {height: 3, width: 5} : {height: 5, width: 3});
    });
  }, []);
  return (
    <motion.div 
      animate={animate}
      transition= {{duration: 0.5 }}
      style={{
        ...frameStyle,
        position: 'relative',
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        borderStyle: 'solid', 
        width: `${160*shape.width}px`, 
        height: `${160*shape.height}px`,
        minWidth: `${160*shape.width}px`,
        minHeight: `${160*shape.height}px`,
      }}
    >
      <AnimatePresence>
        <motion.div
          key={difficulty}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition= {{duration: 0.5 }}
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
                {i*shape.width+j < builtInLevelInfo[difficulty].length ?
                    <Button 
                      variant={colorMode === 'dark' ? 'outlined' : 'contained'}
                      component={Link}
                      to={`/play/${difficulty}/${i*shape.width+j+1}`} 
                      state={{difficulty, levelIdx: i*shape.width+j}}
                      
                      sx={{
                        ...btnStyle, 
                        ...styles.levelBtn, 
                        textShadow: `-2px 0 ${textColor}, 0 2px ${textColor}, 2px 0 ${textColor}, 0 -2px ${textColor}`,
                      }}
                    >
                      <img 
                        src={Boolean(clears & (1 << (i*shape.width+j))) ? StarYellow : StarWhite}
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
