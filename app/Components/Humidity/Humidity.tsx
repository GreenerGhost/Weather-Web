"use client"

import { useGlobalContext } from '@/app/Context/globalContext';
import { droplets } from '@/app/Utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function Humidity() {

  // Se utiliza el dato forecast del contexto global
  const { forecast } = useGlobalContext();

  // Se validará si se encuentran los datos requeridos
  if ( !forecast || 
    !forecast?.main ||
    !forecast?.main?.humidity
  ) return <Skeleton className='h-[12rem] w-full'/>

  const { humidity } = forecast?.main;

  const getHumidityText = ( humidity: number ) => {
    if ( humidity < 30 ) 
      return "Seco: puede causar irritación en la piel"
    if ( humidity >= 30 && humidity < 50) 
      return "Cómodo: Ideal para salud y comodidad"
    if ( humidity >= 50 && humidity < 70 )
      return "Alto: Incomodo, riesgo de crecimiento de moho"
    return "Datos de humedad no disponibles"
  }

  return (
    <div className='py-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <h2 className='flex items-center gap-2 font-medium'>
        { droplets } Humedad
      </h2>
      <p className='text-4xl text-center'>
        { humidity }%
      </p>
      <p className='text-sm text-center'>
        { getHumidityText(humidity) }
      </p>
    </div>
  )
}
