import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import {Provider} from "react-redux"
import {store} from './redux/index.ts'
import ProtectedRoute from './component/ProtectedRoute.tsx';

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
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
          <Dashboard/>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
