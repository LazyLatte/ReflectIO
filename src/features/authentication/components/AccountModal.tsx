import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import UserName from './UserName';
import Login from './Login';
import Register from './Register';
import Modal from '@features/ui/modal';

interface AccountModalProps {};
export interface AccountModalHandle {
  open: () => void;
}
const AccountModal: ForwardRefRenderFunction<AccountModalHandle, AccountModalProps> = ({}, ref) => {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState<string>('username'); 
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, ()=>({
    open: () => setOpen(true)
  }))

  const closeModal = () => {
    setUsername('');
    setPage('username');
    setOpen(false);
  };

  return (
    <Modal open={open}>
      {page === 'username' && <UserName username={username} setUsername={setUsername} setPage={setPage} closeModal={closeModal}/>}
      {page === 'login' && <Login username={username} closeModal={closeModal} setPage={setPage} onLogin={() => {}}/>}
      {page === 'register' && <Register username={username} closeModal={closeModal} setPage={setPage}/>}
    </Modal>
  );
}

export default forwardRef(AccountModal);