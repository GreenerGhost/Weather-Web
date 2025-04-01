"use client";
import { useGlobalContext } from '@/app/Context/globalContext';
import { daysTransform, kelvinToCelsius, weatherConvert } from '@/app/Utils/convert';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { navigation } from '@/app/Utils/Icons';

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

  // se le añade una w al inicio del icono obtenido puesto que el código del icono obtenido inicia por un número, de esta forma evitamos fallas
  const weatherCode = `w${weatherIcon}`;

  // Actualización en tiempo real
  useEffect(() => {

    // Actualización cada segundo, al completar un ciclo se vuelve a realizar el proceso y se actualiza el tiempo
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // Formato personalizado de 24 horas
      const formattedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);

      // Se llama a una función que regresa el día traducido
      setCurrentDay(daysTransform(day));
    }, 1000);
  }, []);


  // Si hay información se mostrarán los datos en pantalla transformados para poder visualizarlos
  return (
    <div className='pt-5 pb-5 px-4 w-full border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
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
          <span>{ weatherConvert(weatherCode) }</span>
          <p className='pt-2 capitalize text-lg font-medium'>{ description }</p>
        </div>
        <p className='flex items-center gap-2'>
          <span>Min. Temp: { minTemp }°</span>
          <span>Máx. Temp: { maxTemp }°</span>
        </p>
      </div>
    </div>
  )
}
