import {FC} from 'react';
import { motion } from "framer-motion"
import {MenuButton} from '@features/ui';
interface MoreLevelsProps {};

const MoreLevels: FC<MoreLevelsProps> = () => {

  return (
    <motion.div
      initial={{x: '100vw', opacity: 0}}
      animate={{ x: 0, opacity: 1}}
      exit={{ x: '100vw', opacity: 0 }}
      transition= { {duration: 0.8 }}
      style={{
        position: 'absolute',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: '64px'
      }}
    >
      <MenuButton themeColor='crimson' to='/explore'>GLOBAL</MenuButton>
      <MenuButton themeColor='cyan' to='/mylevels'>CUSTOM</MenuButton>
    </motion.div>
  );
}

export default MoreLevels;

