import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import NoneGuestUserName from './NoneGuestUserName';
import Login from './Login';
import Register from './Register';
import {BackDrop} from '@features/ui';


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
    <AnimatePresence>
      {open &&
        <BackDrop onClick={closeModal}>
          <motion.div
            variants={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >
            {page === 'username' && <NoneGuestUserName username={username} setUsername={setUsername} setPage={setPage} isGuest={false}/>}
            {page === 'login' && <Login username={username} closeModal={closeModal} setPage={setPage} onLogin={onLogin}/>}
            {page === 'register' && <Register username={username} closeModal={closeModal} setPage={setPage}/>}
          </motion.div>
        </BackDrop>
      }

    </AnimatePresence>
  );
}

export default forwardRef(ReLoginModal);