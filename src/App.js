import "./App.css";
import { useState, useEffect } from "react";
const apiKey = "at_cTk1HcsArO2k4YxTohlSdHfi7tVDV";

function App() {
  const [ip, setIp] = useState("");

  useEffect(() => {
    async function getIp() {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`
      );
      const data = await response.json();
      setIp(data.ip);
    }
    getIp();
  }, []);

  return (
    <header>
      <h1>IP Adress Tracker</h1>
      <div className="search-bar">
        <input placeholder="Search for any IP adress or domain" />
        <span className="icon"> {">"} </span>
      </div>
    </header>
  );
}

export default App;
