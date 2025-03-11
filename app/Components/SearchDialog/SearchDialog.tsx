// Fragmento de código obtenido de diferentes componentes de https://ui.shadcn.com/docs/components/dialog

// Se encarga de desplegar un dialogo de entrada para poder realizar búsquedas que más adelante se habilitarán, 

"use client";

import { commandIcon } from '@/app/Utils/Icons';
import { Button } from '@/components/ui/button';
import { Command, CommandInput } from '@/components/ui/command'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'

export default function SearchDialog() {
  return (
    <div className='search-button'>
      <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
        >
          <p className="text-sm text-muted-foreground">Buscar aquí...</p>
          <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
            {commandIcon}
            <span className="text-[9px]">F</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Escribe un comando o búsqueda..."/>
          <ul className="px-3 pb-2">
            <p className="p-2 text-sm text-muted-foreground">Sugerencias</p>
          </ul>
        </Command>
      </DialogContent>
      </Dialog>
    </div>
  )
}
