import {forwardRef, useImperativeHandle, useState, ForwardRefRenderFunction} from 'react';
import { motion, AnimatePresence  } from "framer-motion"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BackDrop} from '@features/ui';




const styles = {
  btn: {
    width: '60px',
    height: '60px',
    backgroundColor: '#ff6d33',
    border: '3px solid #FAFAD2',
    borderRadius: '999px',
    padding: 0,
    '&:hover': {
      backgroundColor: '#ffa07a'
    }
  }
}

const appear = {
  hidden: {
    scale: 0
  },
  visible: {
    scale: 1
  }
}
interface InstructionModalProps {
  instructions: string[]
};
export interface InstructionModalHandle {
  open: () => void;
}
const InstructionModal: ForwardRefRenderFunction<InstructionModalHandle, InstructionModalProps> = ({instructions}, ref) => {
  const [idx , setIdx] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, ()=>({
    open: () => {
      setIdx(0);
      setOpen(true);
    }
  }))

  const closeModal = () => setOpen(false);
  return (
    <AnimatePresence>
      {open && 
        <BackDrop onClick={(e)=>{
            e.stopPropagation()
            if(idx < instructions.length - 1){
                setIdx(prev => prev + 1)
            }else{
                closeModal();
            }
        }}>
          <motion.div
            variants={appear}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            {idx < instructions.length ? instructions[idx] : ""}
          </motion.div>
        </BackDrop>
      }
    </AnimatePresence>
  );
}

export default forwardRef(InstructionModal);