"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ( { children } ) => {

  // Se crea un objeto vacío donde se guardaran los datos de la API, el primero para los datos del clima y el segundo para los datos de la calidad del aire
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});

  // Pronostico del clima
  const fetchForecast = async () => {
    try {
      // permite hacer una petición al archivo Route.ts si es exitosa se guarda en setForecast
      const res = await axios.get("api/Weather");
      // Se establece el valor del clima en el contexto global  de la app
      setForecast(res.data);
    } catch (error) {
      // En caso de error se muestra el mensaje en consola  en caso contrario se muestra los datos obtenidos de la API
      console.log("Error al obtener los datos de pronóstico del tiempo: ", error.message);
    }
  };

  // Pronostico de la calidad del aire
  const fetchAirQuality = async () => {
    try {
      // permite hacer una petición al archivo route.ts si es exitosa se guarda en setAirQuality
      const res = await axios.get("api/Pollution");
      // Se establece el valor de la calidad del aire en el contexto global  de la app
      setAirQuality(res.data);
    } catch (error) {
      // En caso de error se muestra el mensaje en consola  en caso contrario se muestra los datos obtenidos de la API
      console.log("Error al obtener los datos de la calidad del aire: ", error.message);
    }
  };

  // Se llama a los métodos de fetchForecast y fetchAirQuality al iniciar la app
  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
  }, []);

  return (
    <GlobalContext.Provider 
      value={{ 
        forecast, 
        airQuality,
      }}
    >
      <GlobalContextUpdate.Provider value={{}}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
};


export const useGlobalContext = () => useContext(GlobalContext);

export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);