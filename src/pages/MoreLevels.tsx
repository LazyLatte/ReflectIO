import MotionPage from './MotionPage';
import {MenuButton} from '@features/ui';

const MoreLevels = () => {
  return (
    <MotionPage transitionType='slide'>
      <MenuButton themeColor='crimson' to='/explore'>GLOBAL</MenuButton>
      <MenuButton themeColor='cyan' to='/mylevels'>CUSTOM</MenuButton>
    </MotionPage>
  );
}

export default MoreLevels;

