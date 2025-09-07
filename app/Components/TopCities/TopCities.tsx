"use client";

import defaultStates from '@/app/Utils/defaultStates';
import React from 'react';
import { useGlobalContextUpdate } from '@/app/Context/globalContext';

export default function TopCities() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  
    const getClickedCoords = (lat: number, lon: number) => {
      setActiveCityCoords( [ lat, lon ] );
    };
  return (
    <div className='states flex flex-col gap-3 flex-1'>
      <h2 className='text-center font-medium'>Ciudades Principales</h2>
      <div className='flex flex-col gap-3'>
        { defaultStates.map( ( state, index ) => {
          return (
            <div 
              key={ index } 
              className='border rounded-lg cursor-pointer dark:bg-dark-gray shadow-sm dark:shadow-none'
              onClick={ () => {
                getClickedCoords( state.lat, state.lon );
              }}
            >
              <p className='px-6 py-3'>{ state.name }</p>
            </div>
          )
        } ) }
      </div>
    </div>
  )
}
