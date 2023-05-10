import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {AuthProvider} from './contexts/AuthProvider';
import {ImagesProvider} from './contexts/ImagesProvider';
import {StageConfigProvider} from './contexts/StageConfigProvider';
import {ModalRefProvider} from './contexts/ModalRefProvider';
import {ColorModeProvider} from './contexts/ColorModeProvider';
import { AxiosPrivateProvider } from '@contexts/AxiosPrivateProvider';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect:false,
    },
  },
});

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AxiosPrivateProvider>
            <ColorModeProvider>
              <ImagesProvider>
                <StageConfigProvider>
                  <ModalRefProvider>
                    <Routes>
                      <Route path='/*' element={<App />} />
                    </Routes>
                  </ModalRefProvider>
                </StageConfigProvider>
              </ImagesProvider>
            </ColorModeProvider>
          </AxiosPrivateProvider>
        </AuthProvider>
      <ReactQueryDevtools/>
      </QueryClientProvider> 
    </BrowserRouter>
  </StrictMode>
);
