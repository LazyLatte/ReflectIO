import {forwardRef, useImperativeHandle, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import ForwardIcon from '@mui/icons-material/Forward';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@features/ui/modal';

import Lottie from 'lottie-react';
import OneStarLottie from '@lotties/one-star.json';
import TwoStarLottie from '@lotties/two-star.json';
import ThreeStarLottie from '@lotties/three-star.json';

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

const lottieData = [null, OneStarLottie, TwoStarLottie, ThreeStarLottie];
interface LevelClearModalProps {
  reset: () => void;
  difficulty: Difficulty;
  levelIdx: number;
  star: number;
};
export interface LevelClearModalHandle {
  open: () => void;
}
const LevelClearModal = forwardRef<LevelClearModalHandle, LevelClearModalProps>(({reset, difficulty, levelIdx, star}, ref) => {
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

  const toNextLevel = () => {
    (levelIdx+1 < BuiltInLevelInfo[difficulty].length) && navigate(`/play/${difficulty}/${levelIdx+2}`, {state: {difficulty, levelIdx: levelIdx+1}, replace: true});
    closeModal();
  }

  return (
    <Modal open={open} onBackDropClick={closeModal}>
      <Box 
        position='relative' 
        height='170px' 
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
        <Box position='absolute'bottom='10px' height='120px' width='380px'  borderRadius='5px' sx={{backgroundColor: '#00b3b3'}}/>
        <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center'>
          <Lottie animationData={lottieData[star]} loop={false}/>
        </Box>
        <Box position='absolute' left={0} right={0} top='125px' display='flex' flexDirection='row' justifyContent='space-around' alignItems='center'>
          <Button sx={styles.btn} onClick={toLevelSelect}><MenuIcon sx={{ fontSize: 40 }} /></Button>
          <Button sx={styles.btn} onClick={restart}><RefreshIcon sx={{ fontSize: 40 }} /></Button>
          <Button sx={styles.btn} disabled={levelIdx+1 >= BuiltInLevelInfo[difficulty].length} onClick={toNextLevel}>
            <ForwardIcon sx={{ fontSize: 40 }} />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
})

export default LevelClearModal;