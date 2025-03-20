"use Client";

import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ( { children } ) => {

  // Se crea un objeto vacío donde se guardaran los datos de la API
  const [forecast, setForecast] = useState({});

  const fetchForecast = async () => {
    try {
      // permite hacer una petición al archivo Route.ts si es exitosa se guarda en setForecast
      const res = await axios.get("api/Weather");      

      console.log(res);
      
      
      setForecast(res.data);
    } catch (error) {
      // En caso de error se muestra el mensaje en consola  en caso contrario se muestra los datos obtenidos de la API
      console.log("Error al obtener los datos de pronóstico del tiempo: ", error.message);
    }
  };


  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, }}>
      <GlobalContextUpdate.Provider value={{}}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
};


export const useGlobalContext = () => useContext(GlobalContext);


export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);