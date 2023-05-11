import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {AuthProvider} from './contexts/AuthProvider';
import {ImagesProvider} from './contexts/ImagesProvider';
import {StageConfigProvider} from './contexts/StageConfigProvider';
import {ColorModeProvider} from './contexts/ColorModeProvider';
import { AxiosPrivateProvider } from '@contexts/AxiosPrivateProvider';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
});

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AxiosPrivateProvider>
            <ColorModeProvider>
              <ImagesProvider>
                <StageConfigProvider>
                  <Routes>
                    <Route path='/*' element={<App />} />
                  </Routes>
                </StageConfigProvider>
              </ImagesProvider>
            </ColorModeProvider>
          </AxiosPrivateProvider>
        </AuthProvider>
      </BrowserRouter>
    <ReactQueryDevtools/>
    </QueryClientProvider> 
  </StrictMode>
);
