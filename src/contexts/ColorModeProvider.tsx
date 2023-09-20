import {FC, useState, createContext, useCallback, useMemo} from 'react';
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material';
import {themeSettings} from '../theme';
interface ColorModeContextInterface {colorMode: 'light' | 'dark', toggleColorMode: () => void};
const ColorModeContext = createContext<ColorModeContextInterface | null>(null);

export const ColorModeProvider: FC<Provider> = ({children}) => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');
  const toggleColorMode = useCallback(()=>{
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, []);

  const theme = useMemo(()=>createTheme(themeSettings(colorMode)), [colorMode]);
  return (
    <ColorModeContext.Provider value={{colorMode, toggleColorMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ColorModeContext;
