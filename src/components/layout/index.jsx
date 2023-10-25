import AppMenu from "./appMenu";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  

  return (
    <>
      <AppMenu />
      <Outlet />
    </>
  );
}
