import {useContext} from 'react';
import StageConfigContext from '@contexts/StageConfigProvider';
export const useStageConfig = () => {
  return useContext(StageConfigContext) || {cellWidth: 0, shouldRearrange: false};
}

