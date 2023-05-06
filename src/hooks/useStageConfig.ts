import {useContext} from 'react';
import StageConfigContext from '../contexts/StageConfigProvider';
const useStageConfig = () => {
  return useContext(StageConfigContext) || {cellWidth: 0, shouldRearrange: false};
}

export default useStageConfig;