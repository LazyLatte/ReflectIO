import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal, {ModalBox, ModalButton, ModalSeparator} from '@features/ui/modal';

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
    <Modal open={open} onBackDropClick={closeModal}>
      <ModalBox height={150} width={650}>
        <Typography variant='caption' sx={{textAlign: 'center'}}>UPLOAD THE LEVEL TO THE PUBLIC?</Typography>
        <ModalSeparator/>
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
          <ModalButton width='45%' disabled={false} onClick={handleOnClick}>YES</ModalButton>
          <ModalButton width='45%' disabled={false} onClick={closeModal}>NO</ModalButton>
        </Box>
      </ModalBox>
    </Modal>
  );
}

export default forwardRef(UploadConfirmModal);