import {useContext} from 'react';
import ColorModeContext from '@contexts/ColorModeProvider';

const useColorMode = () => {
  return useContext(ColorModeContext);
}

export default useColorMode;