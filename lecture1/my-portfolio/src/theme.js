import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E85A71',
      light: '#FF6B8A',
      dark: '#D64B7A',
    },
    secondary: {
      main: '#4361EE',
      light: '#5E7BFF',
      dark: '#2962FF',
    },
    background: {
      default: '#0D0D1A',
      paper: '#1A1A2E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
    info: {
      main: '#4EEADB',
    },
  },
  typography: {
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#FF6B8A',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#16213E',
          borderRadius: 12,
          border: '1px solid rgba(78, 234, 219, 0.3)',
        },
      },
    },
  },
});

export default theme;
