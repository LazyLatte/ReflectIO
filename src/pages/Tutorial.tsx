import MotionPage from './MotionPage';
import { TutorialList } from '@features/level/tutorial-level';

const Tutorial = () => {
  return (
    <MotionPage transitionType='slide'>
      <TutorialList/>
    </MotionPage>
  );
}

export default Tutorial;