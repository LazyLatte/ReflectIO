import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import Modal, {ModalBox, ModalButton, ModalSeparator} from '@features/ui/modal';
import Typography from '@mui/material/Typography';

interface verifyModalProps {};
export interface VerifyModalHandle {
  open: (msg: string) => void;
}
const verifyModal: ForwardRefRenderFunction<VerifyModalHandle, verifyModalProps> = ({}, ref) => {
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
    <Modal open={open} onBackDropClick={closeModal}>
      <ModalBox height={250} width={600}>
        <Typography variant='caption' sx={{textAlign: 'center'}}>{errMsg}</Typography>
        <ModalSeparator/>
        <ModalButton width='100%' disabled={false} onClick={closeModal}>OK</ModalButton>
      </ModalBox>
    </Modal>
  );
}

export default forwardRef(verifyModal);