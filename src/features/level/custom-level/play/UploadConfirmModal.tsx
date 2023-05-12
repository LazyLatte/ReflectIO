import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BackDrop, ModalBox, ModalButton, Separator} from '@features/ui';


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
interface UploadConfirmModalProps {
  uploadPreprocess: () => void;
};
export interface UploadConfirmModalHandle {
  open: () => void;
}
const UploadConfirmModal: ForwardRefRenderFunction<UploadConfirmModalHandle, UploadConfirmModalProps> = ({uploadPreprocess}, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, ()=>({
    open: () => {
      setOpen(true);
    }
  }))

  const closeModal = () => setOpen(false);
  const handleOnClick = () => {
    uploadPreprocess();
    closeModal();
  }
  return (
    <AnimatePresence>
      {open &&
        <BackDrop onClick={closeModal}>
          <motion.div
            className='upload_confirm_modal'
            variants={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >
            <ModalBox height={150} width={650}>
              <Typography variant='caption' sx={{textAlign: 'center'}}>UPLOAD THE LEVEL TO PUBLIC?</Typography>
              <Separator/>
              <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                <ModalButton width='45%' disabled={false} onClick={handleOnClick}>YES</ModalButton>
                <ModalButton width='45%' disabled={false} onClick={closeModal}>NO</ModalButton>
              </Box>
            </ModalBox>
          </motion.div>
        </BackDrop>
      }
    </AnimatePresence>
  );
}

export default forwardRef(UploadConfirmModal);