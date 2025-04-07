"use client"

import { useGlobalContext } from '@/app/Context/globalContext';
import { eye } from '@/app/Utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function Visibility() {

  // Se utiliza el dato forecast del contexto global
  const { forecast } = useGlobalContext();

  // Se validará si se encuentran los datos requeridos
  if ( !forecast || 
    !forecast?.visibility
  ) return <Skeleton className='h-[12rem] w-full'/>
  
  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityConverted = Math.round( visibility / 1000 );

    if ( visibilityConverted >= 10 ) 
      return "Excelente: Vista clara y amplia"
    if ( visibilityConverted > 5 )
      return "Buena: Fácilmente navegable"
    if ( visibilityConverted > 2 ) 
      return "Moderado: Algunas limitaciones"
    if ( visibilityConverted <= 2 )
      return "Mala: Restringido y poco claro"
    return "Datos de visibilidad no disponibles"
  };

  return (
    <div className='py-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
          <h2 className='flex items-center gap-2 font-medium'>
            { eye } Visibilidad
          </h2>
          <p className='text-4xl text-center'>
            { Math.round( visibility / 1000) } km
          </p>
          <p className='text-sm text-center'>
            { getVisibilityDescription(visibility) }
          </p>
        </div>
  )
}
