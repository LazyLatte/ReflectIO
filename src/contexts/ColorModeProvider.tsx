import {FC, useState, createContext, useCallback, useMemo} from 'react';
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material';
import {themeSettings} from '../theme';
interface ColorModeContextInterface {mode: 'light' | 'dark', toggleColorMode: () => void};
const ColorModeContext = createContext<ColorModeContextInterface | null>(null);

export const ColorModeProvider: FC<Provider> = ({children}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const toggleColorMode = useCallback(()=>{
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, []);

  const theme = useMemo(()=>createTheme(themeSettings(mode), [mode]), []);
  return (
    <ColorModeContext.Provider value={{mode, toggleColorMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ColorModeContext;
