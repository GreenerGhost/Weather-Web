import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Obtener la API Key de OpenWeatherMap que se encuentra en el documento .env, también se puede sustituir por una apiKey personal
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; 
    
    // Se realiza una búsqueda de los parámetros dados
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    
    // URL de la API de OpenWeatherMap para obtener los datos de los siguientes 5 días con pronostico de cada 3 horas
    //* Para realizar prueba unitaria se deben sustituir los valores sin las llaves
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    // Se utiliza la función fetch para realizar peticiones a la url, usando la opción para revalidar la petición cada hora o cada 3600 segundos
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    })
    
    // Devolución de la respuesta en formato JSON
    return NextResponse.json(await res.json());
  } catch (error) {
    console.log( "Error al obtener los datos de pronóstico del tiempo" );

    return new Response(JSON.stringify({ error: "Error al obtener los datos de pronóstico del tiempo" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 