import React, { useState }  from 'react';
import { FaSistrix } from "react-icons/fa";
import cloudy from "./images/cloudy-day-1.svg";
import clear from "./images/clear.svg";
import rain from "./images/rainy.svg";
import snow from "./images/snow.svg";
import thunderstorm from "./images/thunder.svg"
const api = {
    key: "0bd98ce8db51c803dcb446b59ee264b9",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
function App(){
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
      function handleClick(event){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setWeather(result);
            setQuery('');
            event.preventDefault();
            console.log(result);
        });
    }
      const dateBuilder = () => {
        
        let local = new Date(new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000).getTime() + weather.timezone * 1000);
        let localTime = local.toDateString();
        return `${localTime}`
      }
      if(typeof weather.main != "undefined"){
        var icon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
   
}
    //optional can use open weather icons
      function SwitchCase(props) {
        switch(weather.weather[0].main) {
          case 'Clear':
            return <img src={clear} alt="weather icon" width="50" />;
          case 'Clouds':
            return <img src={cloudy} alt="weather icon" width="50" />;
          case 'Rain':
            return <img src={rain} alt="weather icon" width="50" />;
          case 'Snow':
            return <img src={snow} alt="weather icon" width="50" />;
          case 'thunderstorm':
            return <img src={thunderstorm} alt="weather icon" width="50" />;
          default:
            return <img src={icon} alt="weather icon" width="50" /> ;
        }
      }
      


    return (
        <div className={(typeof weather.main != "undefined") ? ((new Date(new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000).getTime() + weather.timezone * 1000).getHours()<18 && new Date(new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000).getTime() + weather.timezone * 1000).getHours()>6) ? 'wrapper' : 'night') : 'wrapper'}>
        <div className="title">
        <div className="inputLocation"><input type="text" placeholder="Toronto" onChange={e => setQuery(e.target.value)}
            value={query} /><button type="submit" className="search" onClick={handleClick}><FaSistrix /></button></div>
       
            {(typeof weather.main != "undefined") ? (
                <div>
                <div className="location"><p>{weather.name}, {weather.sys.country}</p></div>
                <div className="time"><p>{dateBuilder(new Date()) }</p></div>
                <div className="bottom">
            <div className="temp"><p>{Math.round(weather.main.temp)} <span>°c</span></p></div>
            <div>
                 <div className="icon"> <SwitchCase /></div> 
                {/* <img src={icon} alt="weather icon" width="50" />  */}
                <div className="weather"><p>{weather.weather[0].main}</p></div>
            </div>
        </div>
                </div>
            ) : (<div className="time"><p>Start Searching...</p></div>)}
        </div>
        
       </div>
    );

}
export default App;
