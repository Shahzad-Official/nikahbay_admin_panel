import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import SideBar from "../../components/SideBar/SideBar";
import AppBody from "../../components/AppBody/AppBody";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { TestModel } from "models/TestModel";
import Card from "components/Card/Card";

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
    <div className="dashboard-body">
      <SideBar />
      <AppBody>
        {isLoading ? (
          <div className="flex h-screen justify-center items-center ">
            <HashLoader color="#790252" />
          </div>
        ) : (
          <span className="flex h-screen overflow-scroll flex-wrap ">
            <div className="card">
              <Card className="">
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
              </Card>
            </div>
            
          </span>
        )}
      </AppBody>
    </div>
  );
}
