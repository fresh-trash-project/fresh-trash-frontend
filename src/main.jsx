import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ToastContainer position="top-center" autoClose={5000} />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </RecoilRoot>,
);
