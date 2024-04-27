import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>,
);
