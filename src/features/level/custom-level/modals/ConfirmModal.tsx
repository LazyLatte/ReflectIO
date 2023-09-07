import {forwardRef, useImperativeHandle, useState} from 'react';
import Modal, {ModalBox, ModalButton, ModalSeparator} from '@features/ui/modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ConfirmModalProps {
  onConfirm: () => void;
};
export interface ConfirmModalHandle {
  open: (msg: string, height: number) => void;
}
const ConfirmModal = forwardRef<ConfirmModalHandle, ConfirmModalProps>(({onConfirm}, ref) => {
  const [msg, setMsg] = useState<string>('');
  const [height, setHeight] = useState<number>(400);
  const [open, setOpen] = useState<boolean>(false);
  
  useImperativeHandle(ref, ()=>({
    open: (msg, height) => {
      setMsg(msg);
      setHeight(height);
      setOpen(true);
    }
  }))

  const closeModal = () => setOpen(false);

  return (
    <Modal open={open} onBackDropClick={closeModal}>
      <ModalBox height={height} width={650}>
        <Typography variant='caption' sx={{textAlign: 'center'}}>{msg}</Typography>
        <ModalSeparator/>
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' >
          <ModalButton width='45%' disabled={false} onClick={closeModal}>Cancel</ModalButton>
          <ModalButton width='45%' disabled={false} onClick={()=>{
            onConfirm();
            closeModal();
          }}>
            Confirm
          </ModalButton>
        </Box>
        
      </ModalBox>
    </Modal>
  );
})

export default ConfirmModal;