import { FC, ReactNode, useMemo } from 'react';
import { createTheme, ThemeProvider as BaseThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import themeOptions from 'src/styles/theme/themeOptions';
import componentsOverrides from 'src/styles/theme/overrides/index';
import customThemeOptions from 'src/styles/theme/customThemeOptions';

interface IThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  const theme = useMemo(() => {
    const createdTheme = createTheme(themeOptions, customThemeOptions);
    createdTheme.components = componentsOverrides(createdTheme);

    return createdTheme;
  }, []);

  return (
    <BaseThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
