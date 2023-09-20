import {useContext} from 'react';
import ColorModeContext from '@contexts/ColorModeProvider';

const useColorMode = () => {
  return useContext(ColorModeContext) || {colorMode: 'dark', toggleColorMode: () => {}};
}

export default useColorMode;