import { FC, MouseEventHandler, ReactNode } from 'react';
import {motion} from 'framer-motion'
interface BackDropProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}
export const BackDrop: FC<BackDropProps> = ({onClick, children}) => {
  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      style={{
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
