"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { alert, sun, sunDim, sunMedium } from '@/app/Utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { UvProgress } from '../UvProgress/UvProgress';

export default function UvIndex() {

  // Se utiliza el dato uvIndex del contexto global
  const { uvIndex } = useGlobalContext();

  // Se verifica que los datos se encuentren disponibles
  if ( !uvIndex || !uvIndex.daily ) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const { uv_index_clear_sky_max, uv_index_max } = uvIndex.daily;

  // Se regresa el índice UV según sea el máximo o el claro
  const uvIndexMax = uv_index_max[0].toFixed(1);

  // Se regresa el icono según el índice UV, la variación del índice fue a completa discreción
  const getIcon = () => {
    if ( uvIndexMax <= 2.9 ) {
      return sunDim
    } else if ( uvIndexMax >= 3 && uvIndexMax <= 5.9) {
      return sunMedium
    } else if ( uvIndexMax >= 6 && uvIndexMax <= 7.9 ) {
      return sun
    } else if ( uvIndexMax >= 8 ) {
      return alert
    }
  };

  // Se regresa la categoría del índice UV según el índice UV, también un color descriptivo y una breve descripción
  const uvIndexCategory = (uvIndex: number) => {
    // Se regresa la categoría según el índice UV
    if ( uvIndex <= 2 ) {
      return {
        category: 'Bajo',
        color: 'text-green-500',
        description: 'Protección no requerida'
      }
    } else if ( uvIndex >= 3 && uvIndex <= 5) {
      return {
        category: 'Moderado',
        color: 'text-yellow-500',
        description: 'Protección requerida'
      }
    } else if ( uvIndex >= 6 && uvIndex <= 7 ) {
      return {
        category: 'Alto',
        color: 'text-orange-500',
        description: 'Protección indispensable'
      }
    } else if ( uvIndex >= 8 && uvIndex <= 10 ) {
      return {
        category: 'Muy alto',
        color: 'text-red-500',
        description: 'Protección extremamente requerida'
      }
    } else {
      return {
        category: 'Extremo',
        color: 'text-purple-500',
        description: 'Evitar exposición al sol'
      }
    }
  };

  const marginLeftPercentage = (uvIndexMax / 14) * 100;

  return (
    <div className='py-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 justify-between dark:bg-dark-gray shadow-sm dark:shadow-none'>
        <h2 className='flex items-center gap-2 font-medium'>
          { getIcon() } Indice UV
        </h2>
        <div className='flex flex-col gap-1'>
          <p className='text-3xl text-center   sm:text-2xl'>
          { uvIndexMax }
            <span className='text-sm '> ({ uvIndexCategory( uvIndexMax ).category }) </span>
          </p>
          <UvProgress 
            value={marginLeftPercentage}
            max={14}
            className='uv-progress'
          />
        </div>
      <p className='text-center text-sm'>{ uvIndexCategory( uvIndexMax ).description }</p>
    </div>
  )
}
