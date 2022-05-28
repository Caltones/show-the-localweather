import { useState, useLayoutEffect } from 'react';

import './App.css';

function App() {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [weatherMain, setWeatherMain] = useState('');
  const [icon, setIcon] = useState('');
  const [temp, setTemp] = useState('');
  const [unit, setUnit] = useState('')
  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetch(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUnit('°C')
          setName(data.name);
          setArea(`(${data.sys.country})`);
          setWeatherMain(
            `${data.weather[0].main}(${data.weather[0].description})`
          );
          setIcon(data.weather[0].icon);
          setTemp(data.main.temp.toFixed(1));
          const icon = document.getElementById('favicon');
          icon.href = data.weather[0].icon;
        });
    });
  }, []);
  const handler = ()=>{
    if (unit==='°F'){
      setUnit('°C')
      setTemp(((temp-32)/1.8).toFixed(1))
    }else{
      setUnit('°F')
      
      setTemp((temp * 1.8 + 32).toFixed(1))
    }

  }
  return (
    <div className="App">
  
      <h1>
        {name} {area}
      </h1>
      <h2>
        {weatherMain}
        <img src={icon}></img>
      </h2>
      <h2>{temp}<button onClick={handler} >{unit}</button></h2>
    </div>
  );
}

export default App;
