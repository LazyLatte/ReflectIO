import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import Modal, {ModalBox, ModalButton, ModalSeparator} from '@features/ui/modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface WarningModalProps {
  onConfirm: () => void;
};
export interface WarningModalHandle {
  open: (msg: string) => void;
}
const WarningModal: ForwardRefRenderFunction<WarningModalHandle, WarningModalProps> = ({onConfirm}, ref) => {
  const [warningMsg, setWarningMsg] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  
  useImperativeHandle(ref, ()=>({
    open: (msg) => {
      setWarningMsg(msg);
      setOpen(true);
    }
  }))

  const closeModal = () => setOpen(false);

  return (
    <Modal open={open} onBackDropClick={closeModal}>
      <ModalBox height={400} width={650}>
        <Typography variant='caption' sx={{textAlign: 'center'}}>{warningMsg}</Typography>
        <ModalSeparator/>
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' >
          <ModalButton width='45%' disabled={false} onClick={closeModal}>Cancel</ModalButton>
          <ModalButton width='45%' disabled={false} onClick={()=>{
            onConfirm();
            closeModal();
          }}>Confirm</ModalButton>
        </Box>
        
      </ModalBox>
    </Modal>
  );
}

export default forwardRef(WarningModal);