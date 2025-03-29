"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { kelvinToCelsius, weatherConvert } from '@/app/Utils/convert';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React from 'react';

export default function DailyForecast() {

  const { forecast, fifthDayForecast } = useGlobalContext();

  const { weather } = forecast;
  const { city, list } = fifthDayForecast;

  if (!forecast 
    ||!city 
    ||!list) {
      return <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full'/>;
    }

  if (!forecast 
    ||!weather
  ) {
    return <Skeleton className='h-[12rem] w-full'/>;
  }

  // Se calcula el día actual y se compara con el día de la predicción para mostrar la información
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const todaysForecast = list.filter( ( 
    forecast: { dt_txt: string ; main: { temp: number } } ) => {
    return forecast.dt_txt.startsWith(todayString)
  });

  // Se obtiene información de la constante weather que es un arreglo, obteniendo el primer elemento
  const { icon: weatherIcon } = weather[0];  

  // se le añade una w al inicio del icono obtenido puesto que el código del icono obtenido inicia por un número, de esta forma evitamos fallas
  const weatherCode = `w${weatherIcon}`;
    
  return (
    <div className='pt-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-10 dark:bg-dark-gray shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
      <div className='h-full flex gap-10 overflow-hidden'>
      { todaysForecast.length < 1 ? 
        <h1 className='text-[3rem] line-through text-rose-600'>No información disponible</h1> :
        (
          <div className='w-full'>
            <Carousel>
              <CarouselPrevious />
              <CarouselContent>
                { todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } } ) => {
                    return (
                      <CarouselItem 
                        key={forecast.dt_txt}
                        className='flex flex-col items-center gap-4 basis-[8.5rem] cursor-grab'
                      >
                        <p className='dark:text-gray-100'>
                          { moment(forecast.dt_txt).format("HH:mm") }
                        </p>
                        <span className='pt-2 scale-300'>{ weatherConvert(weatherCode) }</span>
                        <p className='mt-6'>
                          { kelvinToCelsius(forecast.main.temp) }°C
                        </p>
                      </CarouselItem>
                    );
                  }
                ) }
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </div>
        )
      }
      </div>
    </div>
  )
}
