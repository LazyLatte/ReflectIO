import {FC} from 'react';
import useImage from 'use-image';
import {useLocation} from "react-router-dom";
import {Stage, StageButtonGroup, Mode} from '@features/stage';
import useModalRef from '@features/modal';
import BulbImg from '@images/icons/bulb.svg';
import RestartImg from '@images/icons/restart.svg';
import {BuiltInLevels} from '@features/level';
interface LocationState {difficulty: Difficulty; levelIdx: number};
interface DefaultStageProps {levels: BuiltInLevels};
const DefaultStage: FC<DefaultStageProps> = ({levels}) => {
  const {state} = useLocation();
  const {difficulty, levelIdx} = state as LocationState || {difficulty: 'easy', levelIdx: 0};
  const level = levels[difficulty][levelIdx];
  const [levelState, laserActions, targetActions, mirrorActions, addObjects, setLevelClear] = level;


  const {levelClearModalRef} = useModalRef();
  const onClear = () => {
    !levelState.clear && levelClearModalRef.current.open(mirrorActions.resetMirrors, difficulty, levelIdx, 3);
  }

  const [restartImg] = useImage(RestartImg);
  const [bulbImg] = useImage(BulbImg);
  return (
    <Stage mode={Mode.BuiltIn} level={level} onClear={onClear}>
      <StageButtonGroup 
        gridHeight={levelState.height} 
        gridWidth={levelState.width} 
        btnImg1={restartImg}
        btnImg2={bulbImg} 
        onClick1={mirrorActions.resetMirrors} 
        onClick2={()=>alert('Not support yet')}
      />
    </Stage>
  )
}

export default DefaultStage;
