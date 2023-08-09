import MotionPage from './MotionPage';
import {MenuButton} from '@features/ui/button';

const More = () => {
  return (
    <MotionPage transitionType='slide'>
      <MenuButton themeColor='crimson' to='/explore'>GLOBAL</MenuButton>
      <MenuButton themeColor='cyan' to='/mylevels'>CUSTOM</MenuButton>
    </MotionPage>
  );
}

export default More;

