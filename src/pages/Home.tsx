import MotionPage from './MotionPage';
import {MenuButton} from '@features/ui/button';

const Home = () => {
  return (
    <MotionPage transitionType='slide'>
      <MenuButton themeColor='magenta' to='/play'>START</MenuButton>
      <MenuButton themeColor='orange' to='/more'>MORE LEVEL</MenuButton>
      <MenuButton themeColor='royalBlue' to='/tutorial'>HOW TO PLAY</MenuButton>
      <MenuButton themeColor='green' to='/about'>ABOUT US</MenuButton>
    </MotionPage>
  );
}

export default Home;

