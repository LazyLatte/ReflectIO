import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion";
import { ModalBox, ModalButton, ModalInput, BackDrop } from '@features/ui';


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
          </motion.div>
        </BackDrop>
      }

    </AnimatePresence>
  );
}

export default forwardRef(ChangeUsernameModal);