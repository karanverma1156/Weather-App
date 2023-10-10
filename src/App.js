import { useState } from "react";
import "./App.css";
import cloud from "./assets/cloud.png";
import clear from "./assets/clear.png";
import rain from "./assets/rain.png";
import scattered_thuderstorm from "./assets/scattered-thunderstorms.png";
import mist from "./assets/fog.png";
import snow from "./assets/snow.png";
import defaul from "./assets/default.png";
import search2 from "./assets/search.png";
import { useEffect } from "react";
import { format } from "date-fns";

function App() {
  var [date, setDate] = useState(new Date());

  const [icon, setIcon] = useState(defaul);

  const formattedDate = format(date, "EEEE, d MMMM yyyy");

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  let api_key = "6b127ab049c9efeab39c548da9df6349";

  const search = async () => {
    const element = document.getElementsByClassName("search-input");

    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);

    if (response.status === 404) {
      alert("Not a valid City");
      return 0;
    }

    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-speed");
    const temperature = document.getElementsByClassName("temperature");
    const location = document.getElementsByClassName("city-name");
    const cont = document.getElementsByClassName("cont-code");
    const locName = document.getElementsByClassName("name");
    const visibility = document.getElementsByClassName("visibility");
    const temperature2 = document.getElementsByClassName("temperature-2");
    const desc = document.getElementsByClassName("weather-desc");

    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor((data.wind.speed * 3600) / 1000) + " km/hr";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
    location[0].innerHTML = data.name;
    cont[0].innerHTML = data.sys.country;
    locName[0].innerHTML = data.name;
    visibility[0].innerHTML = data.visibility + " mi";
    temperature2[0].innerHTML = Math.floor(data.main.temp) + " °C";
    desc[0].innerHTML = data.weather[0].description;

    const icon_name = data.weather[0].icon;

    switch (icon_name) {
      case "01d":
        setIcon(clear);
        break;
      case "01n":
        setIcon(clear);
        break;
      case "02d":
        setIcon(cloud);
        break;
      case "02n":
        setIcon(cloud);
        break;
      case "03d":
        setIcon(cloud);
        break;
      case "03n":
        setIcon(cloud);
        break;
      case "04d":
        setIcon(cloud);
        break;
      case "04n":
        setIcon(cloud);
        break;
      case "09d":
        setIcon(rain);
        break;
      case "09n":
        setIcon(rain);
        break;
      case "10d":
        setIcon(rain);
        break;
      case "10n":
        setIcon(rain);
        break;
      case "11d":
        setIcon(scattered_thuderstorm);
        break;
      case "11n":
        setIcon(scattered_thuderstorm);
        break;
      case "13d":
        setIcon(snow);
        break;
      case "13n":
        setIcon(snow);
        break;
      case "50d":
        setIcon(mist);
        break;
      case "50n":
        setIcon(mist);
        break;
      default:
        setIcon(defaul);
        break;
    }
  };

  return (
    <div className="container">
      <div className="box-1">
        <div className="b1-1">
          <h2 className="name">-</h2>
          <h2 className="cont-code">-</h2>
        </div>
        <div className="b1-2">
          <div className="b2-1">
            <h2>
              {date.toLocaleTimeString()}
              <span>{formattedDate}</span>
            </h2>
          </div>
          <div className="b2-2">
            <h1 className="temperature-2">-</h1>
          </div>
        </div>
      </div>

      <div className="box-2">
        <div className="boxes b22-1">
          <img src={icon} alt="weather" className="weather-icon"></img>
        </div>
        <div className="boxes b22-2">
          <h1 className="weather-desc">-</h1>
        </div>
        <div className="boxes b22-3">
          <input
            type="text"
            className="search-input"
            placeholder="Search any city"
          ></input>
          <img
            src={search2}
            className="search-icon"
            alt="searchicon"
            onClick={() => {
              search();
            }}
          ></img>
        </div>
        <div className="boxes b22-4">
          <table align="center" cellPadding={10}>
            <th colSpan={2} className="city-name">
              -
            </th>
            <tr>
              <td>Temperature</td>
              <td className="temperature">-</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td className="humidity-percent">-</td>
            </tr>
            <tr>
              <td>Visibility</td>
              <td className="visibility">-</td>
            </tr>
            <tr>
              <td>Wind Speed</td>
              <td className="wind-speed">-</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
