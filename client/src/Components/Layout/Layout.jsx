import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Navigate } from "react-router-dom";
import "./Layout.css";
import { useSelector } from "react-redux";
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';

const Layout = ({ isAuth, children }) => {
  const showNotification = useSelector((state)=>state.workout.showalert);

  if (isAuth) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
        {showNotification && <NotificationContainer />} 

      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};
<Component></Component>;

export default Layout;
