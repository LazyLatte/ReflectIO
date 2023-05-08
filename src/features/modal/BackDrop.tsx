import * as React from 'react'
import {motion} from 'framer-motion'

const BackDrop = ({children, handleOnClick}) => {
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
      onClick={handleOnClick}
    >
      {children}
    </motion.div>
  )

}

export default BackDrop;