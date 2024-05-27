import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Stat = () => {
  const data = [
    {
      name: "Mon",
      "Calories Eat": 220,
      "Calories Burn": 120,
    },
    {
      name: "Tue",
      "Calories Eat": 220,
      "Calories Burn": 120,
    },
    {
      name: "Wed",
      "Calories Eat": 220,
      "Calories Burn": 120,
    },
    {
      name: "Thu",
      "Calories Eat": 220,
      "Calories Burn": 120,
    },
    {
      name: "Fri",
      "Calories Eat": 220,
      "Calories Burn": 120,
    },
    {
      name: "Sat",
      "Calories Eat": 220,
      "Calories Burn": 120,
    },
    {
      name: "Sun",
      "Calories Eat": 220,
      "Calories Burn": 120,
    },
  ];
  return (
    <>
      <div className="charts">
        <h3 className="text-dark text-center">Last Week Diet</h3>
        <ResponsiveContainer width={"100%"} height={"90%"}>
          <BarChart width={500} height={400} data={data}>
            <YAxis />
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray={"3 3"} />
            <Tooltip />
            <Legend />
            <Bar dataKey={"Calories Burn"} fill="#f11c1c" />
            <Bar dataKey={"Calories Eat"} fill="#125363" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Stat;
