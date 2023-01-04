import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SignUp from './views/SignUp/SignUp';
import ChatPage from './views/ChatPage/ChatPage';
import Login from './views/Login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/chat-page",
    element: <ChatPage/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

