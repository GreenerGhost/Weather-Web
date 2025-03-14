// Ciudades de referencia que podrán desplegarse en las sugerencias de búsqueda, estas incluirán datos como su nombre, su código de ciudad, estado, latitud y longitud para mantener precisa su búsqueda

const defaultStates = [
  {
    name: "Mexico",
    country: "MX",
    state: "Mexico",
    lat: 19.4326,
    lon: -99.1332,
  },
  {
    name: "Madrid",
    country: "ES",
    state: "Madrid",
    lat: 40.4165,
    lon: -3.7026,
  },
  {
    name: "London",
    country: "GB",
    state: "England",
    lat: 51.5074,
    lon: 0.1278,
  },
  {
    name: "New York",
    country: "US",
    state: "New York",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: "Sydney",
    country: "AU",
    state: "New South Wales",
    lat: -33.8688197,
    lon: 151.2092955,
  },
  {
    name: "Barcelona",
    country: "ES",
    state: "Catalonia",
    lat: 41.3828939,
    lon: 2.1774322,
  },
];

export default defaultStates;