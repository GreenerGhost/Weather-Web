"use client"
import { useGlobalContext } from '@/app/Context/globalContext';
import { kelvinToCelsius } from '@/app/Utils/convert';
import { thermometer } from '@/app/Utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function FeelsLike() {
  // Se utiliza el dato forecast del contexto global
  const { forecast } = useGlobalContext();

  // Se validará si se encuentran los datos requeridos
  if ( !forecast || 
    !forecast?.main ||
    !forecast?.main?.feels_like
  ) return <Skeleton className='h-[12rem] w-full'/>

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeText = (
    feels_like: number,
    temp_min: number,
    temp_max: number
  ) => {
    const avgTemp = (temp_min + temp_max) / 2;

    if ( feels_like < avgTemp - 5 ) {
      return "Sensación más fría que la actual"
    }
    if ( feels_like > avgTemp - 5 && feels_like <= avgTemp + 5) {
      return "Sensación cercana a la temperatura actual"
    }
    if ( feels_like > avgTemp + 5 ) {
      return "Sensación más cálida que la actual"
    }
    return "La sensación es típica en este rango"
  }

  return (
    <div className='py-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 sm:gap-6 justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <h2 className='flex items-center gap-2 font-medium'>
      { thermometer } Sensación Térmica
      </h2>
      <p className='text-4xl text-center'>
        { kelvinToCelsius(feels_like) } °C
      </p>
      <p className='text-sm text-center'>
        { feelsLikeText(feels_like, temp_min, temp_max) }
      </p>
    </div>
  )
}
