import {FC, ReactNode} from 'react';
import { motion, AnimatePresence, MotionStyle } from "framer-motion"
import BackDrop from './BackDrop';


const variant = {
  hidden: {
    scale: 0
  },
  visible: {
    scale: 1
  }
}
interface AccountModalProps {
    open: boolean;
    onBackDropClick?: () => void;
    style?: MotionStyle;
    children: ReactNode;
};
const Modal: FC<AccountModalProps> = ({open, onBackDropClick, style, children}) => {

  return (
    <AnimatePresence>
      {open &&
        <BackDrop onClick={onBackDropClick || (() => {})}>
          <motion.div
            variants={variant}
            initial='hidden'
            animate='visible'
            exit='hidden'
            onClick={(e)=>e.stopPropagation()}
            style={{...style, position: 'relative'}}
          >
            {children}
          </motion.div>
        </BackDrop>
      }

    </AnimatePresence>
  );
}

export default Modal;