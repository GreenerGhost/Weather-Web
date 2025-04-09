"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from '@/app/Context/globalContext';

function FlyToActiveCity( { activeCityCoords } ) {
  const map = useMap();
  useEffect( () => {
    // Si existen las coordenadas entonces se declaran valores para la función useMap de leaflet
    if (activeCityCoords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      // Se ejecuta la función flyTo para que el mapa se mueva a las coordenadas del activas
      map.flyTo( 
        [ activeCityCoords.lat, activeCityCoords.lon ],
        zoomLev,
        flyToOptions
      )
    }
  }, [ activeCityCoords, map ] );

  return null;
}


export default function Mapbox() {

  // Se utiliza el dato forecast del contexto global
  const { forecast } = useGlobalContext();
  const activeCityCoords = forecast?.coord;
  const name = forecast?.name;

  // Se verifican que los datos a utilizar existan
  if (
    !forecast ||
    !forecast.coord ||
    !activeCityCoords
  ) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    )
  }

  return (
    <div className='flex-1 basis-[50%] border rounded-lg'>
      <MapContainer 
        center={ [ activeCityCoords.lat, activeCityCoords.lon ] }
        zoom={ 13 }
        scrollWheelZoom={ true }
        style={ { height: "calc(100% - 2rem)", width: "calc(100% - 2rem)"} }
        className='rounded-lg m-4'
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle 
          center={ [ activeCityCoords.lat, activeCityCoords.lon ] }
          radius={300}
          pathOptions={{ color: 'red' }}
        />
        <FlyToActiveCity activeCityCoords={ activeCityCoords }/>
      </MapContainer>
    </div>
  )
}
