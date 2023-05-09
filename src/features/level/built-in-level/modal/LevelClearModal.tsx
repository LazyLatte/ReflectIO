import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BackDrop from '../../../ui/backdrop/BackDrop';

import RefreshIcon from '@mui/icons-material/Refresh';
import ForwardIcon from '@mui/icons-material/Forward';
import MenuIcon from '@mui/icons-material/Menu';

//import Lottie from 'react-lottie';

import OneStarLottie from '../../../../img/one-star.json';
import TwoStarLottie from '../../../../img/two-star.json';
import ThreeStarLottie from '../../../../img/three-star.json';
import ThreeStarPurpleLottie from '../../../../img/three-star-purple.json';
import ThreeStarCrimsonLottie from '../../../../img/three-star-crimson.json';


import {useNavigate} from "react-router-dom";
import { Difficulty, BuiltInLevelInfo } from '..';
const styles = {
  btn: {
    width: '60px',
    height: '60px',
    backgroundColor: '#ff6d33',
    border: '3px solid #FAFAD2',
    borderRadius: '999px',
    padding: 0,
    '&:hover': {
      backgroundColor: '#ffa07a'
    }
  }
}

const appear = {
  hidden: {
    scale: 0
  },
  visible: {
    scale: 1
  },
  exit: {
    scale: 0
  }
}
const lottieData = [null, OneStarLottie, TwoStarLottie, ThreeStarLottie, ThreeStarPurpleLottie, ThreeStarCrimsonLottie];
interface LevelClearModalProps {};
interface LevelClearModalHandle {
  open: (reset: ()=>void, difficulty: Difficulty, levelIdx: number, star: number) => void;
}
const LevelClearModal: ForwardRefRenderFunction<LevelClearModalHandle, LevelClearModalProps> = (props, ref) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [reset, setReset] = useState(()=>()=>{});
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [levelIdx, setLevelIdx] = useState<number>(0);

  const [star, setStar] = useState<number>(3);
  useImperativeHandle(ref, ()=>({
    open: (reset: ()=>void, difficulty: Difficulty, levelIdx: number, star: number) => {
      setReset(()=>reset);
      setDifficulty(difficulty);
      setLevelIdx(levelIdx);
      setStar(star);
      setOpen(true);
    }
  }))

  const closeModal = () => setOpen(false);
  const toLevelSelect = () => {
    navigate(-1);
    closeModal();
  }

  const restart = () => {
    reset();
    closeModal();
  }

  const toNextLevel = () => {
    (levelIdx+1 < BuiltInLevelInfo[difficulty].length) && navigate(`/play/${difficulty}/${levelIdx+2}`, {state: {difficulty, levelIdx: levelIdx+1}, replace: true});
    closeModal();
  }
  const clearAnimationOptions = {
    loop: false,
    autoplay: true, 
    animationData: lottieData[star],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <AnimatePresence>
      {open &&
        <BackDrop handleOnClick={closeModal}>
          <motion.div
            className='level_clear_modal'
            variants={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >

            <Box position='relative' height='170px' width='420px' display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' padding='16px' 
                    backgroundColor='#40E0D0' border='5px solid gold' borderRadius='5px'
            >
                <Box position='absolute' top={0} left={0} right={0} bottom={0} border='5px solid #F8F8FF'/>
                <Box position='absolute' top='4px' left='4px' right='4px' bottom='4px' border='5px solid gold'/>
                <Box position='absolute'bottom='10px' height='120px' width='380px' backgroundColor='#00b3b3' borderRadius='5px'/>
                <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center'>
                  {/*<Lottie options={clearAnimationOptions}/>*/}
                </Box>
                <Box position='absolute' left={0} right={0} top='125px' display='flex' flexDirection='row' justifyContent='space-around' alignItems='center'>
                  <Button sx={styles.btn} onClick={toLevelSelect}><MenuIcon sx={{ fontSize: 40 }} /></Button>
                  <Button sx={styles.btn} onClick={restart}><RefreshIcon sx={{ fontSize: 40 }} /></Button>
                  <Button sx={styles.btn} disabled={levelIdx+1 >= BuiltInLevelInfo[difficulty].length} onClick={toNextLevel}>
                  <ForwardIcon sx={{ fontSize: 40 }} />
                  </Button>
                </Box>
              </Box>

          </motion.div>
        </BackDrop>
      }
    </AnimatePresence>
  );
}

export default forwardRef(LevelClearModal);