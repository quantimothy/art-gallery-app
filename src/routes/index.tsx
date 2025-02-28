import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ArtworkDetailPage from '../pages/ArtworkDetailPage';
import GalleryDetailPage from '../pages/GalleryDetailPage';

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/artwork/:id',
        element: <ArtworkDetailPage />,
      },
      {
        path: '/gallery/:id',
        element: <GalleryDetailPage />,
      },
    ],
  },
]; 