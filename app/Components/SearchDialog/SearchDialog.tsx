// Fragmento de código obtenido de diferentes componentes de https://ui.shadcn.com/docs/components/dialog

// Se encarga de desplegar un dialogo de entrada para poder realizar búsquedas que más adelante se habilitarán, 

"use client";

import { useGlobalContext } from '@/app/Context/globalContext';
import { commandIcon } from '@/app/Utils/Icons';
import { Button } from '@/components/ui/button';
import { Command, CommandInput } from '@/components/ui/command'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'

export default function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  
  return (
    <div className='search-button'>
      { /* Esta sección será para poder realizar búsquedas en la API para posteriormente mostrar la información en pantalla */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">Buscar aquí...</p>
            <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              { commandIcon }
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>

        { /* Esta sección mostrará un contenido de dialogo como si fuera una sección que se sobrepone al resto de la página, con el fin de escribir la búsqueda de una ciudad deseada */ }
        <DialogContent className="p-0">
          <Command 
            value={ inputValue }
            onChangeCapture={ handleInput }
            className="rounded-lg border shadow-md"
          >
            <CommandInput
              placeholder="Escribe tu búsqueda..."
            />
            { /* Se utilizará para desplegar una lista de posibles sugerencias de ciudades dadas por defecto */ }
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Sugerencias</p>

              { geoCodedList.length === 0 && <p>Sin resultados</p> }

              { geoCodedList.map((item: {
                country: string;
                state: string;
                name: string;
              }, index: number) => {
                const { country, state, name } = item;
                return <li key={ index } className='py-3 px-2 text-sm rounded-sm cursor-default hover:bg-accent'>
                  <p className='text'>{ name }, { state }, { country }</p>
                </li>
              }) }
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}
