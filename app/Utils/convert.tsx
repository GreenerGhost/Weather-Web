// Se realiza la importación de los iconos que se mostraran en la función de weatherConvert
import { 
  cloud,
  cloudLightning,
  cloudMoon,
  cloudMoonRain,
  cloudSun,
  cloudy,
  drizzle,
  mist,
  moon,
  rain,
  snow,
  sun 
} from '@/app/Utils/Icons';

// Esta es una función para poder transformar los grados Kelvin que regresa la API a grados Celsius para poder mostrarlos en algún componente
export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};


// Se utiliza una tabla de conversión para poder obtener los iconos a partir de un string formado a partir de un código que regresa la API de OpenWeather, de esta forma se obtienen los iconos obtenidos en Lucide, esta función hará más fácil el mantenimiento de iconos
export function weatherConvert(weatherCode: string) {
  // Se obtiene el dato del clima que predomina, de este modo podremos seleccionar el icono que se mostrará
  const weatherCodeOptions = {
    w01d: sun,
    w01n: moon,
    w02d: cloudSun,
    w02n: cloudMoon,
    w03d: cloud,
    w03n: cloud,
    w04d: cloudy,
    w04n: cloudy,
    w09d: drizzle,
    w09n: cloudMoonRain,
    w10d: rain,
    w10n: rain,
    w11d: cloudLightning,
    w11n: cloudLightning,
    w13d: snow,
    w13n: snow,
    w50d: mist,
    w50n: mist,
  }

  // En caso de no tener una respuesta, se definirá un valor por defecto
  const weatherCodeDefault = mist;
  
  // Se obtiene la opción obtenida por el listado de códigos o la opción por defecto
  //* Ajuste para poder utilizar el tipo string en el objeto weatherCodeOptions
  return weatherCodeOptions[weatherCode as keyof typeof weatherCodeOptions] || weatherCodeDefault;
}


// Función para obtención de días en español, puesto que el formato obtenido en timezone se encuentra en inglés
export function daysTransform( day: string ){
  const dayOptions = {
    Sunday: "Domingo", 
    Monday: "Lunes", 
    Tuesday: "Martes", 
    Wednesday: "Miércoles", 
    Thursday: "Jueves", 
    Friday: "Viernes", 
    Saturday: "Sábado"
  };

  // Ajuste para que pueda tomar el tipo string como llave del objeto que usamos para mostrar el día en español, en caso que no se encuentre la opción se regresará el día tal cual se tiene registrado
  return dayOptions[day as keyof typeof dayOptions] || day;
};


// Es una función para poder transformar el porcentaje de la calidad del aire que se obtiene de la API de OpenWeather y se transforma a una breve descripción de la calidad del aire
export const airQualityIndexText = [
  {
    rating: 20,
    description: "Muy Buena"
  },
  {
    rating: 40,
    description: "Buena"
  },
  {
    rating: 60,
    description: "Regular"
  },
  {
    rating: 80,
    description: "Mala"
  },
  {
    rating: 100,
    description: "Muy mala"
  }
];