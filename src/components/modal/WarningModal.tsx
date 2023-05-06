import * as React from 'react';
import {forwardRef, useImperativeHandle, useState, useRef, useEffect, useContext, FC} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import BackDrop from './BackDrop';
import Typography from '@mui/material/Typography';
import ModalFrame from './ModalFrame';
import ModalButton from './ModalButton';
import SerparationLine from './SerparationLine';


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
const WarningModal = (props, ref) => {
  const [errMsg, setErrMsg] = useState('');
  const [open, setOpen] = useState(false);
  
  useImperativeHandle(ref, ()=>({
    open: (msg) => {
      setErrMsg(msg);
      setOpen(true);
    }
  }))

  const closeModal = () => setOpen(false);

  return (
    <AnimatePresence>
      {open &&
        <BackDrop handleOnClick={closeModal}>
          <motion.div
            className='warning_modal'
            variant={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >
            <ModalFrame height={250} width={600}>
              <Typography variant='caption' sx={{textAlign: 'center'}}>{errMsg}</Typography>
              <SerparationLine/>
              <ModalButton width='100%' onClick={closeModal}>OK</ModalButton>
            </ModalFrame>
          </motion.div>
        </BackDrop>
      }
    </AnimatePresence>
  );
}

export default forwardRef(WarningModal);