import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    // Para poder hacer uso de la siguiente API de https://open-meteo.com/ no es necesario contar con una API_KEY, se pueden realizar consultas con 

    // Valores de prueba 
    const lat = -33.3551;
    const lon = -70.7443;

    // URL de la API de Open-Meteo para obtener los valores de 
    //* Para realizar prueba unitaria se deben sustituir los valores sin las llaves
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    // Realización de la petición a la API y obtención del resultado en formato JSON
    const res = await fetch(url, {
      next: { revalidate: 900 }
    });
    
    // Devolución de la respuesta en formato JSON
    return NextResponse.json(await res.json());

  } catch ( error ) {
    console.log( "Error al obtener los datos de radiación ultra-violeta" );

    return new Response(JSON.stringify({ error: "Error al obtener los datos de radiación ultra-violeta" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}