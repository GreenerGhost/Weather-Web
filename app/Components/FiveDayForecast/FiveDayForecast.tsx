"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { daysTransform, kelvinToCelsius, unixToDay } from '@/app/Utils/convert';
import { calender } from '@/app/Utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function FiveDayForecast() {

  // Se obtienen los valores que se necesitan del contexto global
  const { fifthDayForecast } = useGlobalContext();
  const { city, list } = fifthDayForecast;

  // Se verifican que los datos principales se encuentren disponibles
  if (
    !fifthDayForecast ||
    !city ||
    !list
  ) return <Skeleton className='h-[12rem] w-full' />

  // Se procesará la información para obtener el mínimo y máximo de todo el día 
  const processData = (
    // Se declara que este será un arreglo de objetos, que recibirá como valores tres datos, día, temperatura mínima y temperatura máxima
    dailyData: {
      main: { temp_min: number; temp_max: number; };
      dt: number;
    }[]
  ) => {
    var minTemp = Number.MAX_VALUE;
    var maxTemp = Number.MIN_VALUE;

    // Se recorre el arreglo de objetos para obtener el mínimo y máximo de temperatura
    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number; }; }) => { 
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    )
    
    // Se devuelve el mínimo y máximo de temperatura de los días obtenidos en fifthDayForecast
    return {
      day: daysTransform(unixToDay(dailyData[0].dt)),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  // Se crea un arreglo vacío, el cual se llenará con los datos de cada día, se hace cortes cada 8 datos para obtener los datos cada día de los próximos 5 días
  const DailyForecast = [];
  for(let i = 0; i < 40; i += 8) {
    const data = processData(list.slice(i, i + 8));
    DailyForecast.push(data);
  }

  return (
    <div className='pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          { calender } Pronostico de { city.name } de 5 días
        </h2>
        <div className='forecast-list pt-3'>
          { DailyForecast.map( ( day, i ) => {
            return (
              <div 
                key={ i } 
                className='daily-forecast py-4 flex flex-col justify-evenly border-b-2'
              >
                <p> { day.day } </p>
                <p className='text-sm flex justify-between'>
                  <span className='text-sm font-light'>(Bajo)</span>
                  <span className='text-sm font-light'>(Alto)</span>
                </p>

                <div className='flex-1 flex items-center justify-between gap-4'>
                  <p className='font-bold'> { day.minTemp }°C </p>
                  <div className='temperature flex-1 w-full h-2 rounded-lg'></div>
                  <p className='font-bold'> { day.maxTemp }°C </p>
                </div>
              </div>
            );
          } ) }
        </div>
      </div>
    </div>
  )
}
