export const getInfoFromAPI = async () => {
  const requestAPI = await fetch('https://swapi.dev/api/planets/');
  const responseAPI = await requestAPI.json();
  const data = responseAPI.results;
  return data;
//   return responseAPI;
};
