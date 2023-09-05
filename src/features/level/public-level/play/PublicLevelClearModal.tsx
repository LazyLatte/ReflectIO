import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion } from "framer-motion"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TypographyVariantsOptions } from '@mui/material';
import Modal from '@features/ui/modal';

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
declare module '@mui/material/styles' {
  interface CustomTypography {p: TypographyVariantsOptions}
  interface Typography extends CustomTypography {}
  interface TypographyOptions extends CustomTypography {}
}
  
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {p: true}
}

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

const lottieData = [null, OneStarLottie, TwoStarLottie, ThreeStarLottie, ThreeStarPurpleLottie, ThreeStarCrimsonLottie];
interface PublicLevelClearModalProps {
  reset: () => void;
  updateBarDisplay: () => void;
  clearText: string;
  star: number;
  warning: boolean;
};
export interface PublicLevelClearModalHandle {
  open: () => void;
}
const PublicLevelClearModal: ForwardRefRenderFunction<PublicLevelClearModalHandle, PublicLevelClearModalProps> = ({reset, updateBarDisplay, clearText, star, warning}, ref) => {
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
    updateBarDisplay();
  }
  return (
    <Modal open={open} onBackDropClick={() => {
      closeModal();
      updateBarDisplay();
    }}>
      <Box 
        position='relative' 
        height='230px' 
        width='420px' 
        display='flex' 
        flexDirection='column' 
        justifyContent='space-around' 
        alignItems='center' 
        padding='16px'  
        border='5px solid gold' 
        borderRadius='5px'
        sx={{
          backgroundColor: '#40E0D0'
        }}
      >
          <Box position='absolute' top={0} left={0} right={0} bottom={0} border='5px solid #F8F8FF'/>
          <Box position='absolute' top='4px' left='4px' right='4px' bottom='4px' border='5px solid gold'/>
          <Box position='absolute'bottom='10px' height='180px' width='380px' borderRadius='5px' sx={{backgroundColor: '#00b3b3'}}/>
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
    </Modal>
  );
}

export default forwardRef(PublicLevelClearModal);