import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar.tsx";

export const Layout = () => (
  <div className="layout">
    <Navbar />
    <Outlet />
  </div>
);