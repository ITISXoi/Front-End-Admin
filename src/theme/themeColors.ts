declare module '@mui/material/styles' {
  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    red: string;
    purple: string;
    yellow: string;
  }
}

export const primary = {
  100: '#a8a6c5',
  200: '#7e7d99',
  300: '#6a6884',
  400: '#4a4963',
  500: '#27273F',
  light: '#b24f60',
  main: '#27273F',
  dark: '#ff8da1',
  red: '#FF6B93',
  purple: '#A798FF',
  yellow: '#FF9777',
};

export const secondary = {
  100: '#F9F9F9',
  200: '#ECEFF5',
  300: '#E5EAF2', // outline or border
  400: '#94A4C4', // text muted
  500: '#1d2438', // main text
  main: '#1d2438', // main text
  light: '#F9F9F9',
  red: '#FF6B93',
  purple: '#A798FF',
  yellow: '#FF9777',
};

export const error = {
  main: '#FD396D',
};

export const success = {
  main: '#2CC5BD',
};

export const warning = {
  main: '#FFE91F',
  dark: '#FFD600',
};

export const info = {
  main: '#A798FF',
};

export const text = {
  primary: primary.main,
  secondary: secondary[400],
  disabled: secondary[300],
};
