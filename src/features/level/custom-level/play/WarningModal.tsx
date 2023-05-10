import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import {BackDrop, ModalBox, ModalButton, Separator} from '@features/ui';
import Typography from '@mui/material/Typography';

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
interface WarningModalProps {};
export interface WarningModalHandle {
  open: (msg: string) => void;
}
const WarningModal: ForwardRefRenderFunction<WarningModalHandle, WarningModalProps> = (props, ref) => {
  const [errMsg, setErrMsg] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  
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
        <BackDrop onClick={closeModal}>
          <motion.div
            className='warning_modal'
            variants={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >
            <ModalBox height={250} width={600}>
              <Typography variant='caption' sx={{textAlign: 'center'}}>{errMsg}</Typography>
              <Separator/>
              <ModalButton width='100%' disabled={false} onClick={closeModal}>OK</ModalButton>
            </ModalBox>
          </motion.div>
        </BackDrop>
      }
    </AnimatePresence>
  );
}

export default forwardRef(WarningModal);