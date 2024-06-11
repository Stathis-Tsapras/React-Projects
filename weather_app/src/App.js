import './App.css';
import React, { useState , useEffect } from 'react';
import axios from 'axios';

const getCurrentDate = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const date = new Date();
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${dayName}, ${monthName} ${day}, ${year}`;
};

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city,
            units: 'metric',
            appid: 'f00c38e0279b7bc85480c3fe775d518c'
          }
        });
        setWeather(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setCity(event.target.value);
    }
  };

  return (
      <div className="app">
        <div className="app-name">
         <h1>Weather App</h1>
          <div className="date">{getCurrentDate()}</div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Enter city name"
                onKeyPress={handleSearch}
              />
            </div>
                  {loading && <p>Loading...</p>}
                  {error && <p>Error fetching weather data: {error.message}</p>}
                  {weather && (
                    <div>
                      <h1>{weather.name}, {weather.sys.country}</h1>
                      <p>{Math.round(weather.main.temp)}°C</p>
                      <p>{weather.weather[0].description}</p>
                      <p>Wind: {weather.wind.speed} m/s</p>
                    </div>
                    )}
          </div>
      </div>
  );
}

export default App;
