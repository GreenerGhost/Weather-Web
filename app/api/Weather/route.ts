import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {

    // Obtener la API Key de OpenWeatherMap que se encuentra en el documento .env, también se puede sustituir por una apiKey personal
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; 

    // Se realiza una búsqueda de los parámetros dados
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // URL de la API de OpenWeatherMap para obtener los datos del clima
    //* Para realizar prueba unitaria se deben sustituir los valores sin las llaves, el dato "lang=es" regresa los valores de description en español, si no se utiliza se obtiene en inglés
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es`;

    // Realización de la petición a la API y obtención del resultado en formato JSON
    const res = await axios.get(url);
    
    // Devolución de la respuesta en formato JSON
    return NextResponse.json(res.data);

  } catch ( error ) {
    console.log( "Error al obtener los datos de pronóstico del tiempo" );

    return new Response(JSON.stringify({ error: "Error al obtener los datos de pronóstico del tiempo" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}