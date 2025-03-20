"use client";
import { useGlobalContext } from '@/app/Context/globalContext';
import { kelvinToCelsius } from '@/app/Utils/convert';
import { cloud, cloudLightning, cloudMoon, cloudMoonRain, cloudSun, cloudy, drizzle, mist, moon, navigation, rain, snow, sun } from '@/app/Utils/Icons';
import React, { useState } from 'react';

export default function Temperature() {

  // Aquí se debe implementar la lógica para obtener la temperatura actual y mostrarla
  const { forecast } = useGlobalContext();

  // Se usa el concepto de destructuring para obtener la información deseada y mostrarla en pantalla por el componente
  const { main, timezone, name, weather } = forecast;

  // Si no se obtuvo respuesta de la API, o no se obtiene información del Clima se mostrará el mensaje de carga
  if (!forecast || !weather) {
    return <div>Cargando...</div>
  }

  // Se calcula la temperatura actual en grados Celsius a partir de los datos obtenidos de la API
  const temp = kelvinToCelsius(main?.temp)
  const minTemp = kelvinToCelsius(main?.temp_min)
  const maxTemp = kelvinToCelsius(main?.temp_max)

  // Tiempo
  const [localTime, setLocalTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  // Se obtiene información de la constante weather que es un arreglo, obteniendo el primer elemento
  const { icon: weatherIcon, description } = weather[0];  

  // Se obtiene el dato del clima que predomina, de este modo podremos seleccionar el icono que se mostrará
  const weatherCodeOptions = {
    w01d: sun,
    w01n: moon,
    w02d: cloudSun,
    w02n: cloudMoon,
    w03d: cloud,
    w03n: cloud,
    w04d: cloudy,
    w04n: cloudy,
    w09d: drizzle,
    w09n: cloudMoonRain,
    w10d: rain,
    w10n: rain,
    w11d: cloudLightning,
    w11n: cloudLightning,
    w13d: snow,
    w13n: snow,
    w50d: mist,
    w50n: mist,
  }

  // En caso de no tener una respuesta, se definirá un valor por defecto
  const weatherCodeDefault = mist;

  // Se obtiene la opción obtenida por el listado de códigos o la opción por defecto
  const getIcon = (weatherCode: string) => {
    return weatherCodeOptions[weatherCode] || weatherCodeDefault;
  }

  // se le añade una w al inicio del icono obtenido puesto que el código del icono obtenido inicia por un número, de esta forma evitamos fallas
  const weatherCode = `w${weatherIcon}`;

  // Si hay información se mostrarán los datos en pantalla transformados para poder visualizarlos
  return (
    <div className='pt-6 pb-5 border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <p className="flex justify-between items-center">
        <span className="font-medium">{ currentDay }</span>
        <span className="font-medium">{ localTime }</span>
      </p>
      <p className="py-2 font-bold flex gap-2">
        <span>{ name }</span>
        <span>{ navigation }</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{ temp }°</p>

      <div>
        <div>
          <span>{ getIcon(weatherCode) }</span>
          <p className='pt-2 capitalize text-lg font-medium'>{ description }</p>
        </div>
        <p>
          <span>Min. Temp: { minTemp }°</span>
          <span>Máx. Temp: { maxTemp }°</span>
        </p>
      </div>
    </div>
  )
}
