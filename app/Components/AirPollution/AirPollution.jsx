"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { Skeleton } from '@/components/ui/skeleton';
import { thermo } from '@/app/Utils/Icons';
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { airQualityIndexText } from '@/app/Utils/convert';

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
  };

  // Calcula el índice de calidad del aire
  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  // Busca el índice de calidad del aire que se encuentra en la lista de calidad del aire indexText para obtener la descripción de la calidad del aire
  const filteredIndex = airQualityIndexText.find( ( item ) => {
    // se utiliza un mayor igual para poder determinar la descripción incluyendo los valores intermedios de los descritos
    return item.rating >= airQualityIndex;
  } );

  return (
    <div className='air-pollution col-span-full sm-2:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none'>
      <h2 className='flex items-center gap-2 font-medium'>
        { thermo } Calidad del Aire
      </h2>
      { /*Se realizaron modificaciones al archivo progress.tsx para poder modificar la barra de progreso, de esta forma solo se obtiene un punto para visualizar mejor */ }
      <Progress 
        value={ airQualityIndex }
        max={ 100 }
        className='progress'
      />
      <p>La calidad del aire es { filteredIndex?.description }.</p>
    </div>
  );

}
