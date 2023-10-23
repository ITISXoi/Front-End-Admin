import { Theme, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';

export const getRainbowTheme = (mode: 'dark' | 'light'): Theme => {
  const theme = mode === 'dark' ? darkTheme() : lightTheme();
  return {
    colors: {
      ...theme.colors,
      accentColor: '#FF007A',
      accentColorForeground: '#fff',
      closeButton: '#979797',
      error: '#ff1744',
    },
    fonts: {
      body: `"Roboto", "Helvetica", "Arial", sans-serif`,
    },
    blurs: theme.blurs,
    radii: {
      ...theme.radii,
      menuButton: '10px',
      connectButton: '10px',
      modal: '12px',
    },
    shadows: theme.shadows,
  };
};
