import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import Modal, {ModalBox, ModalButton, ModalSeparator} from '@features/ui/modal';
import Typography from '@mui/material/Typography';

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
    <Modal open={open} onBackDropClick={closeModal}>
      <ModalBox height={250} width={600}>
        <Typography variant='caption' sx={{textAlign: 'center'}}>{errMsg}</Typography>
        <ModalSeparator/>
        <ModalButton width='100%' disabled={false} onClick={closeModal}>OK</ModalButton>
      </ModalBox>
    </Modal>
  );
}

export default forwardRef(WarningModal);