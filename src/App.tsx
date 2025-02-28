import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { GalleryProvider } from './context/GalleryContext';
import { AuthProvider } from './context/AuthContext';
import { routes } from './routes';

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GalleryProvider>
          <AppRoutes />
        </GalleryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
