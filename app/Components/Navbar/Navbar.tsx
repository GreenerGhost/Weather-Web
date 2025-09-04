// Para poder instalar componentes de https://ui.shadcn.com es necesario que se tenga una versión inferior que React-19, de lo contrario presentará fallas de incompatibilidad
"use client";
import { github } from '@/app/Utils/Icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'
import ThemeDropdown from '../ThemeDropdown/ThemeDropdown';
import SearchDialog from '../SearchDialog/SearchDialog';
import { useGlobalContext } from '@/app/Context/globalContext';

export default function Navbar() {

  const router = useRouter();

  const { state } = useGlobalContext();
  

  return (
    // Implementación de la navegación con atributos tailwind para los estilos
    <div className='w-full py-4 flex items-center justify-between'>
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">

        <SearchDialog/>

        <div className="button-group flex items-center gap-2">
          { /*Componente obtenido de ui.shadcn que permite seleccionar el tema claro u oscuro en la página*/ }
          <ThemeDropdown/>
          
          { /*Componente de shadcn, es un botón que permite redireccionar o realizar acciones dependiendo su configuración*/ }
          <Button 
            className='source-code flex items-center gap-2'
            onClick={ () => { router.push("https://github.com/GreenerGhost/Weather-Web")} }
          >{ github } Código fuente</Button>
        </div>
        
      </div>
    </div>
  )
}
