import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import Modal,{ ModalBox, ModalButton, ModalInput}  from '@features/ui/modal';

interface ChangeUsernameModalProps {};
export interface ChangeUsernameModalHandle {
  open: () => void;
}
const ChangeUsernameModal: ForwardRefRenderFunction<ChangeUsernameModalHandle, ChangeUsernameModalProps> = (props, ref) => {
  const [newUsername, setNewUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg1, setErrMsg1] = useState('');
  const [errMsg2, setErrMsg2] = useState('');
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, ()=>({
    open: () => setOpen(true)
  }))

  const closeModal = () => {
    setNewUsername('');
    setPwd('');
    setErrMsg1('');
    setErrMsg2('');
    setOpen(false);
  };

  return (
    <Modal open={open} onBackDropClick={closeModal}>
      <ModalBox height={250} width={700}>
        <ModalInput
          type="text"
          id="newUsername"
          placeholder='NEW USERNAME'
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          errMsg={errMsg1}
          autoFocus
          required
          
        />
        <ModalInput
          type="password"
          id="password"
          placeholder='PASSWORD'
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          errMsg={errMsg2}
          required
          autoFocus={false}
        />
        <ModalButton width='100%' disabled={false} onClick={()=>{}}>Confirm</ModalButton>
      </ModalBox>
    </Modal>
  );
}

export default forwardRef(ChangeUsernameModal);