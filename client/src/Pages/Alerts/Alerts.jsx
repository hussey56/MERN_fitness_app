import React, { useEffect, useState } from "react";
import "./Alert.css";
import { useDispatch, useSelector } from "react-redux";
import { getalerts, viewalerts } from "../../Api/internal";
import { setAlerts } from "../../Store/UserSlice";
import Loader from "../../Components/Loader/Loader";
import {useNavigate}  from 'react-router-dom'
const Alerts = () => {
  const alerts = useSelector((state) => state.user.alerts);
  const userId = useSelector((state) => state.user._id);
  const timeFormatter = (timestamp) => {
    const date = new Date(Number(timestamp));

    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(date);
    return formattedDate;
  };
  const header = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fetchAlerts = async () => {
    setLoading(true);
    const response = await getalerts(user._id);
    if (response.status == 200) {
      dispatch(setAlerts(response.data));
    }
    setLoading(false);
  };

  const viewAllAlerts = async () => {
    const response = await viewalerts(userId);
    if (response.status == 201) {
    } else {
      console.log("internal error");
    }
  };
  useEffect(() => {
    fetchAlerts();
  }, []);
  useEffect(() => {
    viewAllAlerts();
  }, [alerts]);
  if (loading) {
    return <Loader text="fetching alerts ..." />;
  }
  return (
    <>
      <div className="container">
        <h2 className="alert-heading">
          Alerts (<span className="text-primary"> {alerts.length} </span>)
        </h2>
        <div className="alert-container">
          {alerts.length >= 1 &&
            alerts.map((alert) => {
              if (alert.category == "diet") {
                return (
                  <div className="alert-tile">
                    <div className="icon-container bg-diet">
                      <i className="text-warning fa-solid fa-utensils "></i>
                    </div>
                    <div className="alert-text">
                      <span id="alert-time">{timeFormatter(alert.time)}</span>
                      <h3>
                        {alert.message}{" "}
                        <span className="alert-view" onClick={()=>header(`/singlediet/${alert.id}`)}>view </span>
                      </h3>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="alert-tile">
                    <div className="icon-container bg-workout">
                      <i className="text-info fa-solid fa-dumbbell"></i>
                    </div>
                    <div className="alert-text">
                      <span id="alert-time">{timeFormatter(alert.time)}</span>
                      <h3>
                        {alert.message}{" "}
                        <span className="alert-view" onClick={()=>header(`/singleworkout/${alert.id}`)}>view </span>
                      </h3>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Alerts;
