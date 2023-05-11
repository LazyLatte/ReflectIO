import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import UserName from './UserName';
import Login from './Login';
import Register from './Register';
import { BackDrop } from '@features/ui';


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
interface AccountModalProps {};
export interface AccountModalHandle {
  open: () => void;
}
const AccountModal: ForwardRefRenderFunction<AccountModalHandle, AccountModalProps> = (props, ref) => {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState<string>('username'); 
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, ()=>({
    open: () => setOpen(true)
  }))

  const closeModal = () => setOpen(false);

  return (
    <AnimatePresence>
      {open &&
        <BackDrop onClick={()=>{}}>
          <motion.div
            variants={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >
            {page === 'username' && <UserName username={username} setUsername={setUsername} setPage={setPage} closeModal={closeModal}/>}
            {page === 'login' && <Login username={username} closeModal={closeModal} setPage={setPage} onLogin={() => {}}/>}
            {page === 'register' && <Register username={username} closeModal={closeModal} setPage={setPage}/>}
          </motion.div>
        </BackDrop>
      }

    </AnimatePresence>
  );
}

export default forwardRef(AccountModal);