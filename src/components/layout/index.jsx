import AppMenu from "./appMenu";

export default function Layout({ children }) {
  

  return (
    <>
      <AppMenu />
      {children}
    </>
  );
}
