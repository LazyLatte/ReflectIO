import {useContext} from 'react';
import ColorModeContext from '../contexts/ColorModeProvider';

const useMode = () => {
  return useContext(ColorModeContext);
}

export default useMode;