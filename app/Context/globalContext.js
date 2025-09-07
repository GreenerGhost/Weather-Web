"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import defaultStates from "../Utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();

const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ( { children } ) => {

  // Se crea un objeto vacío donde se guardaran los datos de la API, el primero para los datos del clima, el segundo para los datos de la calidad del aire y el tercero para el pronostico hasta el quinto día
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fifthDayForecast, setFifthDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([
    //Se utilizarán coordenadas de defaultStates para realizar pruebas
    19.4326, -99.1332,
  ]);

  // * Se modificaron las funciones async para poder tomar los parámetros de latitud y longitud

  // Pronostico del clima
  const fetchForecast = async ( lat, lon ) => {
    try {
      // permite hacer una petición al archivo Route.ts si es exitosa se guarda en setForecast
      const res = await axios.get(`api/Weather?lat=${lat}&lon=${lon}`);
      // Se establece el valor del clima en el contexto global  de la app
      setForecast(res.data);
    } catch (error) {
      // En caso de error se muestra el mensaje en consola  en caso contrario se muestra los datos obtenidos de la API
      console.log("Error al obtener los datos de pronóstico del tiempo: ", error.message);
    }
  };

  // Pronostico de la calidad del aire
  const fetchAirQuality = async ( lat, lon ) => {
    try {
      // permite hacer una petición al archivo route.ts si es exitosa se guarda en setAirQuality
      const res = await axios.get(`api/Pollution?lat=${lat}&lon=${lon}`);
      // Se establece el valor de la calidad del aire en el contexto global  de la app
      setAirQuality(res.data);
    } catch (error) {
      // En caso de error se muestra el mensaje en consola  en caso contrario se muestra los datos obtenidos de la API
      console.log("Error al obtener los datos de la calidad del aire: ", error.message);
    }
  };

  // Pronostico del quinto día
  const fetchFifthDayForecast = async ( lat, lon ) => {
    try {
      // permite hacer una petición al archivo route.ts si es exitosa se guarda en setFifthDayForecast
      const res = await axios.get(`api/FifthDay?lat=${lat}&lon=${lon}`);

      // Se establece el valor del pronostico del quinto día en el contexto global  de la app
      setFifthDayForecast(res.data);
    } catch (error) {
      // En caso de error se muestra el mensaje en consola  en caso contrario se muestra los datos obtenidos de la API
      console.log("Error al obtener los datos del pronóstico del quinto día: ", error.message);
    }
  };

  // Pronostico de radiación ultravioleta 
  const fetchUvIndex = async ( lat, lon ) => {
    try {
      // permite hacer una petición al archivo route.ts si es exitosa se guarda en setUvIndex
      const res = await axios.get(`api/UVIndex?lat=${lat}&lon=${lon}`);

      // Se establece el valor de la radiación ultravioleta en el contexto global  de la app
      setUvIndex(res.data);
    } catch (error) {
      // En caso de error se muestra el mensaje en consola  en caso contrario se muestra los datos obtenidos de la API
      console.log("Error al obtener los datos de la radiación ultravioleta: ", error.message);
    }
  };

  // Manejo de Entrada de datos
  const handleInput = ( e ) => {
    setInputValue( e.target.value );

    // Si no introduce información en el recuadro de búsqueda se pondrán los datos de los estados por defecto
    if( e.target.value === "" ) {
      setGeoCodedList( defaultStates );
    }
  }

  // Lista de información geográfica
  const fetchGeoCodedList = async ( search ) => {
    try {
      // permite hacer una petición al archivo route.ts si es exitosa se guarda en setGeoCodedList
      const res = await axios.get(`/api/GeoCodedData?search=${search}`);
      console.log(res.data);
      
      setGeoCodedList(res.data)
    } catch (error) {
      console.log("Error al obtener la lista de información geográfica: ", error.message);
    }
  }

  // Función para evitar rebote de información usando lodash
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // Limpieza
    return () => debouncedFetch.cancel();
  }, [inputValue])

  // Se llama a los métodos al iniciar la app
  useEffect(() => {
    fetchForecast( activeCityCoords[0], activeCityCoords[1] );
    fetchAirQuality( activeCityCoords[0], activeCityCoords[1] );
    fetchFifthDayForecast( activeCityCoords[0], activeCityCoords[1] );
    fetchUvIndex( activeCityCoords[0], activeCityCoords[1] );
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider 
      value={{ 
        forecast, 
        airQuality,
        fifthDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{
        setActiveCityCoords,
      }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
};


export const useGlobalContext = () => useContext(GlobalContext);

export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);