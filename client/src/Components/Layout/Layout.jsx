import React, { Component, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Navigate } from "react-router-dom";
import "./Layout.css";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { getalerts } from "../../Api/internal";
import { setAlerts } from "../../Store/UserSlice";

const Layout = ({ isAuth, children }) => {
  const showNotification = useSelector((state)=>state.workout.showalert);

  if (isAuth) {
    
    return (
      <>
        <Navbar />
        {children}
        <Footer />
        {showNotification == true && <NotificationContainer />} 

      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};
<Component></Component>;

export default Layout;
