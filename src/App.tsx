import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appRoutes from "./AppRoutes.tsx";
import AuthListener from './shared/Authenticated.tsx';

const router = createBrowserRouter(appRoutes);

const App: React.FC = () => (
     <>
      <AuthListener />
      <RouterProvider router={router}/>
    </>
    
);

export default App;