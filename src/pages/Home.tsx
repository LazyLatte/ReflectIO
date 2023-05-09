import {FC} from 'react';
import { motion } from "framer-motion";
import {MenuButton} from '@features/ui';
interface HomeProps {};

const Home: FC<HomeProps> = () => {

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
      <MenuButton themeColor='magenta' to='/play'>START</MenuButton>
      <MenuButton themeColor='orange' to='/more'>MORE LEVEL</MenuButton>
      <MenuButton themeColor='royalBlue' to='/instructions'>HOW TO PLAY</MenuButton>
      <MenuButton themeColor='green' to='/about'>ABOUT US</MenuButton>
    </motion.div>
  );
}

export default Home;

