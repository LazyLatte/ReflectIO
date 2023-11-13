import {FC, ReactNode} from 'react';
import { motion, MotionStyle } from "framer-motion";
interface MotionPageProps {
    transitionType: "slide" | "fade" | "zoom" | "none";
    style?: MotionStyle;
    children: ReactNode;
};
const variants = {
    slide: {
      hidden: {x: '100vw', opacity: 0},
      visible: { x: 0, opacity: 1}
    },
    fade: {
      hidden: {opacity: 0},
      visible: {opacity: 1}
    },
    zoom: {
      hidden: {scale: 0},
      visible: {scale: 1}
    },
    none: {
      hidden:{},
      visible: {}
    }
}
const transitionDurations = {
    slide: {
      duration: 0.8
    },
    fade: {
      duration: 0.5
    },
    zoom: {
      duration: 0.5
    },
    none: {
      duration: 0
    }
}
const MotionPage: FC<MotionPageProps> = ({transitionType, style, children}) => {
  return (
    <motion.div
      variants={variants[transitionType]}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition= {transitionDurations[transitionType]}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: '5vh',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}
export default MotionPage;

