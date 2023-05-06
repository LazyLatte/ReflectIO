import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {AuthProvider} from './contexts/AuthProvider';
import {ImagesProvider} from './contexts/ImagesProvider';
import {StageConfigProvider} from './contexts/StageConfigProvider';
import {ModalRefProvider} from './contexts/ModalRefProvider';
import {ColorModeProvider} from './contexts/ColorModeProvider';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
