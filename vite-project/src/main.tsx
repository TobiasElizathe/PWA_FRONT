import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/Layout/Layout.tsx";
import { FallBack } from "./components/Fallback/FallBack.tsx";
import { Signup } from "./pages/Signup/Signup";
import { Posts } from "./pages/Posts/Post.tsx";
import { PostPanel } from "./pages/postPanel/PostPanel.tsx";
import { Users } from "./pages/User/Users.tsx";
import { PostCreate  } from './pages/postCreate/PostCreate.tsx';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
    errorElement: <FallBack />,
  },
  {
    path: "/Signup",
    element: <Signup />,
    errorElement: <FallBack />,
  },
  {
    element: <Layout />,
    errorElement: <FallBack />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/PostPanel/:id",          
        element: <PostPanel />,      
      },
            {
        path: "/users",
        element: <Users />,
      },

      {
        path: "/postCreate",
        element: <PostCreate />,
      },



    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
