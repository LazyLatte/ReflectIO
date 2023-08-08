import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import NoneGuestUserName from './NoneGuestUserName';
import Login from './Login';
import Register from './Register';
import Modal from '@features/ui/modal';

interface ReLoginModalProps {
  onLogin: () => void;
};
export interface ReLoginModalHandle {
  open: () => void;
}
const ReLoginModal: ForwardRefRenderFunction<ReLoginModalHandle, ReLoginModalProps> = ({onLogin}, ref) => {
  const [username, setUsername] = useState<string>('');
  const [page, setPage] = useState<string>('username'); 
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, ()=>({
    open: () => {
      setOpen(true);
    }
  }))

  const closeModal = () => setOpen(false);
  return (
    <Modal open={open} onBackDropClick={closeModal}>
      {page === 'username' && <NoneGuestUserName username={username} setUsername={setUsername} setPage={setPage} isGuest={false}/>}
      {page === 'login' && <Login username={username} closeModal={closeModal} setPage={setPage} onLogin={onLogin}/>}
      {page === 'register' && <Register username={username} closeModal={closeModal} setPage={setPage}/>}
    </Modal>
  );
}

export default forwardRef(ReLoginModal);