import {FC} from 'react';
import Stage from '../components/stage/Stage';
import StageButtonGroup from '../components/stage/StageButtonGroup';
import {BuiltInLevels} from '../Interfaces';
import {useLocation} from "react-router-dom";
import useImages from '../hooks/useImages';
import useModalRef from '../hooks/useModalRef';
interface LocationState {difficulty: Difficulty; levelIdx: number};
interface DefaultStageProps {levels: BuiltInLevels};
const DefaultStage: FC<DefaultStageProps> = ({levels}) => {
  const {state} = useLocation();
  const {difficulty, levelIdx} = state as LocationState || {difficulty: 'easy', levelIdx: 0};
  const level = levels[difficulty][levelIdx];
  const [levelState, mirrorActions, setTargetClear, setLevelClear, customizationTools] = level;

  const {restartImg, bulbImg} = useImages()?.StageButtonImages || {};
  const {levelClearModalRef} = useModalRef();
  const clearCallback = () => {
    if(!levelState.clear){
      setLevelClear(true);
      levelClearModalRef.current.open(mirrorActions.resetMirrors, difficulty, levelIdx, 3);
    }
  }
  
  return (
    <Stage level={level} clearCallback={clearCallback}>
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
