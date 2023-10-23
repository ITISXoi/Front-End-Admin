import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import store from 'store';
import Web3Provider from 'utils/web3/Web3Provider';
import routes from './routes';
import { ukoTheme } from './theme';

const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
  },
};

const queryClient = new QueryClient(queryClientOption);

const App: FC = () => {
  const allPages = useRoutes(routes);

  // App theme
  const appTheme = ukoTheme();

  // toaster options
  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Montserrat', sans-serif",
    },
  };

  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Toaster toastOptions={toasterOptions} />
          <QueryClientProvider client={queryClient}>
            <Web3Provider>{allPages}</Web3Provider>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
};

export default App;
