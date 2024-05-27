import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Routine = () => {
  const data = [
    {
      name: "Mon",
      Exercise: 5,
      Cardio: 2,
    },
    {
      name: "Tue",
      Exercise: 8,
      Cardio: 4,
    },
    {
      name: "Wed",
      Exercise: 3,
      Cardio: 1,
    },
    {
      name: "Thu",
      Exercise: 2,
      Cardio: 2,
    },
    {
      name: "Fri",
      Exercise: 1,
      Cardio: 1,
    },
    {
      name: "Sat",
      Exercise: 7,
      Cardio: 2,
    },
    {
      name: "Sun",
      Exercise: 1,
      Cardio: 3,
    },
  ];
  return (
    <div className="charts">
      <h3 className="text-dark text-center">Last Week Workouts</h3>

      <ResponsiveContainer width={"100%"} height={"90%"}>
        <AreaChart width={500} height={400} data={data}>
          <YAxis  />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Area
            dataKey={"Exercise"}
            type={"monotone"}
            stroke="#2563eb"
            fill="#3b82f6"
          />
          <Area
            dataKey={"Cardio"}
            type={"monotone"}
            stroke="#000000"
            fill="#fffffff"
            stackId={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Routine;
