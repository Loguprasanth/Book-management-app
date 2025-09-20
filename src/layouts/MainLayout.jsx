import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "16px" ,
      backgroundColor:"rgb(243 244 246)",
      height:"calc(100% - 65px)"
    }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
