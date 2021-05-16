import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import CloudIcon from "@material-ui/icons/Cloud";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AcUnitIcon from "@material-ui/icons/AcUnit";

function Home() {
  const currDate = new Date().getDate();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var d = new Date();
  var monthName = months[d.getMonth()];
  var event = new Date();
  var options = { weekday: "long" };
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d656e538e3bec6854c8193c35f0ce7ad`;
      const res = await fetch(url);
      // console.log(res);
      const resJson = await res.json();
      // console.log(resJson);
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);

  return (
    <div className="home">
      <div className="home__title">
        <div className="title__line">
          <h1>Weather Forcast</h1>
          <img src="https://cdn1.iconfinder.com/data/icons/weather-elements/512/Weather_SunAbstract.png" />
        </div>
        <p>Local Weather Around the World. Find your area weather.</p>
      </div>
      <div className="temperature__search">
        <input
          className="cityName"
          type="text"
          placeholder="Enter Your City Name"
          autoCapitalize="off"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button>Search</button>
      </div>
      {!city ? (
        <div className="temperature__notFound">
          <p>Please Enter the City Name</p>
        </div>
      ) : (
        <div>
          <div className="temperature__date">
            <p>
              {monthName} {currDate}
            </p>
            <p>{event.toLocaleDateString("en-US", options)}</p>
          </div>
          <div className="temperature__details">
            <div className="temperature__city">
              <h2>{search}</h2>
            </div>
            <div className="temperature__number">
              <p>
                <span>{city.temp}</span>
                <sup>o</sup>C
              </p>
              {city.temp < 5 && <AcUnitIcon className="snow" />}
              {city.temp < 20 &&
                city.temp > 6 &&
                city.temp > <CloudIcon className="cloud" />}
              {city.temp >= 20 && city.temp < 30 && (
                <BeachAccessIcon className="rain" />
              )}
              {city.temp >= 30 && <Brightness7Icon className="sun" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
