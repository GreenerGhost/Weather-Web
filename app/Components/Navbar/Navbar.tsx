"use client";
import { github } from '@/app/Utils/Icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
// Para poder instalar componentes de https://ui.shadcn.com es necesario que se tenga una versión inferior que React-19, de lo contrario presentará fallas de incompatibilidad
import React from 'react'

export default function Navbar() {

  const router = useRouter();

  return (
    // Implementación de la navegación con atributos tailwind para los estilos
    <div className='w-full py-4 flex items-center justify-between'>
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <Button 
          className='source-code flex items-center gap-2'
          onClick={ () => { router.push("https://github.com")} }
        >{ github } Código fuente</Button>
      </div>
    </div>
  )
}
