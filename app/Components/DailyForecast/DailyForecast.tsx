"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { kelvinToCelsius, weatherConvert } from '@/app/Utils/convert';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React from 'react';


export default function DailyForecast() {

  // Se almacenan los datos que serán necesarios para poder mostrar la información de pronostico
  const { forecast, fifthDayForecast } = useGlobalContext();
  const { weather } = forecast;
  const { city, list } = fifthDayForecast;

  // Se valida que la información principal se encuentre disponible
  if (!forecast 
    ||!city 
    ||!list) {
      return <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full'/>;
    }

  if ( !forecast || !weather ) {
    return <Skeleton className='h-[12rem] w-full'/>;
  }

  // Se crea una variable para obtener el día actual con el cual se podrá filtrar la información y obtener los pronósticos del día cada 3 horas
  const today = new Date();
  // Al momento de usar la función toISOString el día actual se transforma al día posterior, es decir un día después
  const todayString = today.toISOString().split("T")[0];

  // Se filtran todos los pronósticos del día actual, puesto que se obtienen los pronósticos de 5 días
  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );

  // Se verifica que se hayan pronósticos para el día actual
  if ( todaysForecast.length < 1 ) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'/>
    )
  }

  // Se regresa el icono, esta vez se utiliza una función puesto que se deben ser diferentes datos a diferente horario
  const getIcon = ( weatherIcon: string ) => {
    // se le añade una w al inicio del icono obtenido puesto que el código del icono obtenido inicia por un número, de esta forma evitamos fallas
    return weatherConvert(`w${ weatherIcon }`);
  };
    
  return (
    <div className='pt-4 px-4 h-[12rem] border rounded-lg flex flex-col gap-10 dark:bg-dark-gray shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
      <div className="h-full flex gap-10 overflow-scroll">
        { /*Se realiza un operador ternario si el arreglo tiene menos de 1 se mostrará que no hay datos disponibles, de lo contrario se mostrará el componente Carousel el cual podrá desplegar los datos con cierto diseño */ }
        { todaysForecast.length < 1 ? (
          <div className='flex justify-center items-center'>
            <h1 className='text-[3rem] line-through text-rose-600'>
              No hay datos disponibles
            </h1>
          </div>
        ) : (
          <div className='w-full'>
            { /* //* Es importante mencionar que los datos en la API pueden variar, ya sea que no se encuentre información disponible, que solo aparezca un dato o los datos completos */ }
            <Carousel>
              <CarouselContent>
                { /* Se crean los items de la lista de pronósticos, con la función map se desplegarán todos los datos de interés */ }
                { todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number }; weather: { 0: { icon: string} } } ) => {
                    return (
                      <CarouselItem
                        key={ forecast.dt_txt }
                        className='flex flex-col w-full justify-between items-center gap-5 basis-[8.5rem] cursor-grab'
                      >
                        <p className='font-medium black:text-gray-300'>
                          { moment( forecast.dt_txt ).format("HH:mm") }
                        </p>
                        <p className='pt-2 scale-300'>{ getIcon( forecast.weather[0].icon ) }</p>
                        <p className='mt-6'>
                          { kelvinToCelsius( forecast.main.temp ) }°C
                        </p>
                      </CarouselItem>
                    );
                  }
                ) }
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}
