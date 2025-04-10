"use client";

import defaultStates from '@/app/Utils/defaultStates';
import React from 'react';

export default function TopCities() {
  return (
    <div className='states flex flex-col gap-3 flex-1'>
      <h2 className='flex items-center gap-2 font-medium'>Ciudades Principales</h2>
      <div className='flex flex-col gap-3'>
        { defaultStates.map( ( state, index ) => {
          return (
            <div key={ index } className='border rounded-lg cursor-pointer dark:bg-dark-gray shadow-sm dark:shadow-none'>
              <p className='px-6 py-3'>{ state.name }</p>
            </div>
          )
        } ) }
      </div>
    </div>
  )
}
