import {forwardRef, useImperativeHandle, useState, useRef, useEffect, useContext, FC} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import useAuth from '../../../hooks/useAuth';
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
const AccountModal = (props, ref) => {
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
        <BackDrop handleOnClick={()=>{}}>
          <motion.div
            variant={appear}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e)=>e.stopPropagation()}
          >
            {page === 'username' && <UserName username={username} setUsername={setUsername} setPage={setPage} closeModal={closeModal}/>}
            {page === 'login' && <Login username={username} closeModal={closeModal} setPage={setPage}/>}
            {page === 'register' && <Register username={username} closeModal={closeModal} setPage={setPage}/>}
          </motion.div>
        </BackDrop>
      }

    </AnimatePresence>
  );
}

export default forwardRef(AccountModal);