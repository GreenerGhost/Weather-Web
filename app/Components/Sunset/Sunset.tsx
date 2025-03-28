"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { unixToTime } from '@/app/Utils/convert';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { sunset } from '@/app/Utils/Icons';

export default function Sunset() {

  // Se utiliza el dato forecast del contexto global
  const { forecast } = useGlobalContext();

  // Se verifica que los datos se encuentren disponibles
  if (!forecast ||
    !forecast?.sys ||
    !forecast?.sys?.sunset ) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  // Se calcula el tiempo de atardecer y amanecer con la función unixToTime
  const sunsetTime = unixToTime(forecast?.sys?.sunset, forecast?.timezone);
  const sunriseTime = unixToTime(forecast?.sys?.sunrise, forecast?.timezone);

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <div className="top">
        <h2 className='flex items-center gap-2 font-medium'>
          { sunset } Atardecer
        </h2>
        <p className='pt-4 text-2xl'>{ sunsetTime }</p>
      </div>

      <p>Amanecer: { sunriseTime }</p>
    </div>
  )
}
