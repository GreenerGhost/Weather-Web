
// Esta es una función para poder transformar los grados Kelvin que regresa la API a grados Celsius para poder mostrarlos en algún componente
export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
}