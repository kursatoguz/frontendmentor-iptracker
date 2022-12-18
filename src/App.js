import "./App.css";
import { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const url = "https://geo.ipify.org/api/v2/country,city?apiKey=";
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState(false);

  async function getIp() {
    const response = await fetch(`${url}${process.env.REACT_APP_API_KEY}`);
    if (!response.ok) {
      setError(true);
      throw new Error(response.status + " " + response.statusText);
    } else {
      const data = await response.json();
      setIp(data.ip);
      setLocation(data.location.country + ", " + data.location.city);
      setTimezone(data.location.timezone);
      setIsp(data.isp);
      setLat(data.location.lat);
      setLng(data.location.lng);
      setPostalCode(data.location.postalCode);
    }
  }
  async function handleSearch(event) {
    event.preventDefault();
    const query = event.target.elements.query.value;
    if (checkIp(query)) {
      const response = await fetch(
        `${url}${process.env.REACT_APP_API_KEY}&ipAddress=${query}`
      );
      const data = await response.json();
      setIp(data.ip);
      setLocation(data.location.country + ", " + data.location.city);
      setTimezone(data.location.timezone);
      setIsp(data.isp);
      setLat(data.location.lat);
      setLng(data.location.lng);
      setPostalCode(data.location.postalCode);
    } else {
      showToastMessage();
    }
  }
  function checkIp(ip) {
    const regexExp =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(ip);
  }
  const showToastMessage = () => {
    toast.error("Please enter a valid ip adress or domain", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    getIp();
  }, []);
  if (error) return <h1>Something went wrong</h1>;

  return (
    <>
      <header>
        <h1>IP Adress Tracker</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            name="query"
            placeholder="Search for any IP adress or domain"
          />
          <button className="icon" type="submit">
            {" "}
            {">"}{" "}
          </button>
        </form>
        <div className="info">
          <div className="ip-adress content">
            <h2>IP Adress</h2>
            <p>{ip}</p>
          </div>
          <div className="location content">
            <h2>Location</h2>
            <p>{location}</p>
            <p>{postalCode}</p>
          </div>
          <div className="timezone content">
            <h2>Timezone</h2>
            <p>UTC {timezone}</p>
          </div>
          <div className="isp content">
            <h2>ISP</h2>
            <p>{isp}</p>
          </div>
        </div>
      </header>
      <MapContainer google={window.google} lat={lat} lng={lng} />
    </>
  );
}

export default App;
