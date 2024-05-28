import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Navigate } from "react-router-dom";
import "./Layout.css";
const Layout = ({ isAuth, children }) => {
  if (isAuth) {
    return (
      <>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};
<Component></Component>;

export default Layout;
