"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { formatNumber } from '@/app/Utils/convert';
import { people } from '@/app/Utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

export default function Population() {

  // Se hace uso de la variable fifthDayForecast del contexto global
  const { fifthDayForecast } = useGlobalContext();
  const { city } = fifthDayForecast;

  // Se verifica que existan los valores principales que se desean utilizar
  if ( !fifthDayForecast || !city ) {
    return <Skeleton className='h-[12rem] w-full' />
  }
  
  return (
    <div className='py-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 sm:gap-6 justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <h2 className='flex items-center gap-2 font-medium'>
        { people } Población
      </h2>
      <div className='top'>
        <p className='text-4xl text-center'>
          { formatNumber(city.population) }
        </p>
      </div>
      <p className='text-sm text-center'>Los valores de { city.name } pueden variar según la API.</p>
    </div>
  )
}
