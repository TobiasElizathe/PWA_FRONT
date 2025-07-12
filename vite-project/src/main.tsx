import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { FallBack } from "./components/Fallback/FallBack.tsx";
import { Signup } from "./pages/Signup/Signup";
import { Post } from "./pages/Posts/Post.tsx";
import { PostPanel } from "./pages/postPanel/PostPanel.tsx";
import { Users } from "./pages/User/Users.tsx";
import { UserPanel } from "./pages/UserPanel/UserPanel.tsx";

import './index.css'


const Layout = () => (
  <div className="layout">
    <Navbar />
    <Outlet />
  </div>
);

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
        element: <Post />,
      },
      {
        path: "/postPanel",
        element: <PostPanel />,
      },
            {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/userPanel",
        element: <UserPanel />,
      },


    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
