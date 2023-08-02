import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <RegisterPage/>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
