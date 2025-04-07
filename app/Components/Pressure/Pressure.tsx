"use client"

import { useGlobalContext } from '@/app/Context/globalContext';
import { gauge } from '@/app/Utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

export default function Pressure() {
  // Se utiliza el dato forecast del contexto global
  const { forecast } = useGlobalContext();

  // Se validará si se encuentran los datos requeridos
  if ( !forecast || 
    !forecast?.main || 
    !forecast?.main?.pressure
  ) return <Skeleton className='h-[12rem] w-full'/>
  
  const { pressure } = forecast?.main;

  const getPressureDescription = ( pressure: number) => {
    if ( pressure < 1000 )
      return "Muy baja presión"
    if ( pressure >= 1000 && pressure < 1015 )
      return "Baja presión"
    if ( pressure >= 1015 && pressure < 1025 )
      return "Presión normal"
    if ( pressure >= 1025 && pressure < 1040 )
      return "Presión alta"
    if ( pressure >= 1040 )
      return "Muy alta presión, tomar precaución"
    return "Datos de visibilidad no disponibles"
  }

  return (
      <div className='py-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
            <h2 className='flex items-center gap-2 font-medium'>
              { gauge } Presión Atmosférica
            </h2>
            <p className='text-3xl text-center'>
              { pressure } hPa
            </p>
            <p className='text-sm text-center'>
              { getPressureDescription( pressure ) }
            </p>
          </div>
    )
}
