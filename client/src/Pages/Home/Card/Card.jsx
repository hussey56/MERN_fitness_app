import React from "react";
import "./Card.css";
import { BiBarChart, BiAlarm, BiDumbbell, BiFoodMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Card = () => {
  const navigate = useNavigate();
  const cards = [
    { title: "Workouts", icon: <BiDumbbell /> ,path:"/workouts"},
    { title: "Diet", icon: <BiFoodMenu />,path:"/mydiet" },
    { title: "Progress", icon: <BiBarChart />,path:"/" },
    { title: "Alerts", icon: <BiAlarm />,path:"/alerts"  },
  ];
  return (
    <div className="container mt-4">
      <div className="row">
        {cards.map((item) => (
          <div className="col-md-3" key={item.title}>
            <div className="mycard bg-light" onClick={()=>navigate(item.path)}>
              <div className="card-icon bg-primary">{item.icon}</div>
              <div className="card-title">
                <h2>{item.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
