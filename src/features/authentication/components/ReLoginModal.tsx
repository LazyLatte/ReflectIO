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
interface ReLoginModalProps {};
export interface ReLoginModalHandle {
  open: (isGuest: boolean) => void;
}
const ReLoginModal: ForwardRefRenderFunction<ReLoginModalHandle, ReLoginModalProps> = (props, ref) => {
  const [username, setUsername] = useState<string>('');
  const [page, setPage] = useState<string>('username'); 
  const [open, setOpen] = useState(false);
  const [isGuest, setIsGuest] = useState<boolean>(true);
  useImperativeHandle(ref, ()=>({
    open: (isGuest) => {
      setOpen(true);
      setIsGuest(isGuest);
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
            {page === 'username' && <NoneGuestUserName username={username} setUsername={setUsername} setPage={setPage} isGuest={isGuest}/>}
            {page === 'login' && <Login username={username} closeModal={closeModal} setPage={setPage}/>}
            {page === 'register' && <Register username={username} closeModal={closeModal} setPage={setPage}/>}
          </motion.div>
        </BackDrop>
      }

    </AnimatePresence>
  );
}

export default forwardRef(ReLoginModal);