import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import AppBody from "../../components/AppBody/AppBody";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { TestModel } from "models/TestModel";
import Card from "components/Card/Card";
import styles from "./Dashboard.module.css";
import users from "../../assets/icons/users.svg";
import AppLineChart from "components/Charts/LineChart";

export default function Dashboard() {
  const [data, setData] = useState<TestModel[]>();
  const [isLoading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((value) => {
        setData(value.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.dashboardBody}>
      <SideBar />
      <AppBody>
        {isLoading ? (
          <div className="flex h-screen justify-center items-center ">
            <HashLoader color="#790252" />
          </div>
        ) : (
          <span className=" flex w-full overflow-scroll flex-wrap p-3">
            <div className=" h-fit flex w-full flex-col sm:flex-row ">
              <Card className="bg-gray-500 bg-opacity-50 relative w-100 overflow-hidden w-full ">
                <img
                  className="h-20 w-20 -z-10 absolute  right-2"
                  src={users}
                  alt="user icon"
                />
                <h2 className="text-lg font-semibold self-start">
                  Total Users
                </h2>
                <h4 className="text-base font-medium self-start">
                  {Intl.NumberFormat(window.navigator.language, {
                    compactDisplay: "short",
                  }).format(5000)}
                </h4>
              </Card>
              <span className="mt-4 ml-4" />
              <Card className="bg-green-500 bg-opacity-50 relative w-100 overflow-hidden w-full">
                <img
                  className="h-20 w-20 -z-10 absolute  right-2"
                  src={users}
                  alt="user icon"
                />
                <h2 className="text-lg font-semibold self-start">New Users</h2>
                <h4 className="text-base font-medium self-start">
                  {Intl.NumberFormat(window.navigator.language, {
                    compactDisplay: "short",
                  }).format(5000)}
                </h4>
              </Card>
            </div>

            <Card className="mt-4  flex w-full overflow-hidden ">
              <AppLineChart />
            </Card>
          </span>
        )}
      </AppBody>
    </div>
  );
}
