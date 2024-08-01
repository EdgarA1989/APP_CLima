import React, { useState } from "react";

const WheaterApp = () => {
  //VARIABLES
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "183a5e9c95697692e92201ba4b6ad8b1";
  const difKelvin = 273.15;

  //HOOKS
  const [ciudad, setCiudad] = useState([]);
  const [dataClima, setDataClima] = useState(null);

  //FUNCIONES
  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>

      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {/* Si hay datos de clima ejecuto sino no. */}
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p className="temperatura">
            Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C
          </p>
          <p>Condición meteorologica: {dataClima.weather[0].description}</p>
          <img
            src={`https:openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};

export default WheaterApp;
