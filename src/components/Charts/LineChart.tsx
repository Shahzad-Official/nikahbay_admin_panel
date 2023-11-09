import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./LineChart.module.css";

// Sample data
const data = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 12 },
  { name: "May", value: 18 },
  { name: "Jun", value: 25 },
];

// Custom tooltip component
interface CustomTooltipProps {
  active: boolean;
  payload: { name: string; value: number }[];
  label: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className={styles["custom-tooltip"]}>
        <p className="font-semibold">{`Users`}</p>
        <p>{`${data.value}`}</p>
      </div>
    );
  }

  return null;
};
const CustomLegend = () => (
  <div className="mt-4 flex items-center w-full justify-center">
    <div
      className={styles["legend-color"]}
      style={{ backgroundColor: "#af0171" }}
    />
    <p className="ml-2">Users</p>
  </div>
);

function AppLineChart() {
  return (
    <div
      style={{ width: "100%", height: 400 }}
      className="flex flex-col items-center"
    >
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />{" "}
          <Line type="monotone" dataKey="value" name="Users" stroke="#af0171" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export default AppLineChart;