"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { Skeleton } from '@/components/ui/skeleton';
import { thermo } from '@/app/Utils/Icons';
import React from 'react';

export default function AirPollution() {

  // Se obtiene los datos de la calidad del aire de la contexto global
  const { airQuality } = useGlobalContext();

  // Verificar si airQuality esta disponible, verificar si las propiedades necesarias se encuentran disponibles
  if (
      !airQuality || 
      !airQuality.list || 
      !airQuality.list[0] ||
      !airQuality.list[0].main 
    ) {
    return <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full'/>;
  }


  return (
    <div className='air-pollution col-span-full sm-2:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <h2 className='flex items-center gap-2 font-medium'>
        { thermo }Air Pollutions
      </h2>
    </div>
  )

}
