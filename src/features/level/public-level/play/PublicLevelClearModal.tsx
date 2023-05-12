import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BackDrop} from '@features/ui';

import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import ErrorIcon from '@mui/icons-material/Error';

import Lottie from 'lottie-react';
import OneStarLottie from '@lotties/one-star.json';
import TwoStarLottie from '@lotties/two-star.json';
import ThreeStarLottie from '@lotties/three-star.json';
import ThreeStarPurpleLottie from '@lotties/three-star-purple.json';
import ThreeStarCrimsonLottie from '@lotties/three-star-crimson.json';

import {useNavigate} from "react-router-dom";
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
interface PublicLevelClearModalProps {
  reset: () => void;
  clearText: string;
  star: number;
  warning: boolean;
};
export interface PublicLevelClearModalHandle {
  open: () => void;
}
const PublicLevelClearModal: ForwardRefRenderFunction<PublicLevelClearModalHandle, PublicLevelClearModalProps> = ({reset, clearText, star, warning}, ref) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, ()=>({
    open: () => {
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
  return (
    <AnimatePresence>
      {open &&
        <BackDrop onClick={closeModal}>
          <motion.div
            className='level_clear_modal'
            variants={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >

            <Box position='relative' height='230px' width='420px' display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' padding='16px' 
                    backgroundColor='#40E0D0' border='5px solid gold' borderRadius='5px'
            >
                <Box position='absolute' top={0} left={0} right={0} bottom={0} border='5px solid #F8F8FF'/>
                <Box position='absolute' top='4px' left='4px' right='4px' bottom='4px' border='5px solid gold'/>
                <Box position='absolute'bottom='10px' height='180px' width='380px' backgroundColor='#00b3b3' borderRadius='5px'/>
                <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center'>
                  <Lottie animationData={lottieData[star]} loop={false}/>
                  <motion.div
                    initial={{x: '200px', opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{duration: 0.8}}
                    style={{
                      position: 'relative', 
                      bottom: '20px', 
                      alignSelf: 'center', 
                      zIndex: 99
                    }}
                  > 
                    {warning ? 
                      <Typography variant='p' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ab2121', fontWeight: 'bold'}}>
                        <ErrorIcon sx={{fontSize: 16 }}/>
                        &nbsp;
                        {clearText}
                      </Typography>
                      :
                      <Typography variant='h4' sx={{color: star === 3 ? '#fff280' : '#6A5ACD', fontWeight: 'bold'}}>{clearText}</Typography>
                    }
                    
                  </motion.div>
                </Box>
                <Box position='absolute' left={0} right={0} top='185px' display='flex' flexDirection='row' justifyContent='space-around' alignItems='center'>
                  <Button sx={styles.btn} onClick={toLevelSelect}><MenuIcon sx={{ fontSize: 40 }} /></Button>
                  <Button sx={styles.btn} onClick={restart}><RefreshIcon sx={{ fontSize: 40 }} /></Button>
                </Box>
              </Box>

          </motion.div>
        </BackDrop>
      }
    </AnimatePresence>
  );
}

export default forwardRef(PublicLevelClearModal);