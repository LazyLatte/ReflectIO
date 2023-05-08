import * as React from 'react';
import {forwardRef, useImperativeHandle, useState, useRef, useEffect, useContext, FC} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BackDrop from './BackDrop';
import ModalFrame from './ModalFrame';
import ModalInput from './ModalInput';
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
const UploadConfirmModal = (props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [uploadFunc, setUploadFunc] = useState(() => ()=>{});
  useImperativeHandle(ref, ()=>({
    open: (upload) => {
      setOpen(true);
      setUploadFunc(()=>()=>{
        upload();
        setOpen(false);
      });
    }
  }))

  const closeModal = () => setOpen(false);

  return (
    <AnimatePresence>
      {open &&
        <BackDrop handleOnClick={closeModal}>
          <motion.div
            className='upload_confirm_modal'
            variant={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >
            <ModalFrame height={150} width={650}>
              <Typography variant='caption' sx={{textAlign: 'center'}}>UPLOAD THE LEVEL TO PUBLIC?</Typography>
              <SerparationLine/>
              <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                <ModalButton width='45%' onClick={uploadFunc}>YES</ModalButton>
                <ModalButton width='45%' onClick={closeModal}>NO</ModalButton>
              </Box>
            </ModalFrame>
          </motion.div>
        </BackDrop>
      }
    </AnimatePresence>
  );
}

export default forwardRef(UploadConfirmModal);