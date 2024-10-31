const axios = require("axios");
const planetMapping = require("../utils/planetMapping");
const SWAPI_URL = "https://swapi.py4e.com/api/planets";
const transformData = (data) => {
  const transformed = {};

  for (const key in data) {
    if (Array.isArray(data[key])) {
      transformed[planetMapping[key]] = data[key].map((item) => {
        return typeof item === "string" ? item : transformData(item);
      });
    } else if (typeof data[key] === "object" && data[key] !== null) {
      transformed[planetMapping[key]] = transformData(data[key]);
    } else {
      transformed[planetMapping[key]] = data[key];
    }
  }
  return transformed;
};
const getPlanets = async () => {
  try {
    const response = await axios.get(SWAPI_URL);
    const data = response.data;
    const transformedData = {
      [planetMapping.count]: data.count,
      [planetMapping.next]: data.next,
      [planetMapping.previous]: data.previous,
      [planetMapping.results]: data.results.map((item) => transformData(item)),
    };
    return transformedData;
  } catch (error) {
    throw new Error("Error al obtener los planetas de SWAPI");
  }
};
const getPlanetsById = async (id) => {
  try {
    const response = await axios.get(`${SWAPI_URL}/${id}`);

    const data =  transformData(response.data);
    return data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      console.log("Error status:", status);

      if (status !== 200) {
        return { status, error: error.response.data };
      } else {
        return { status, error: "Error al obtener los planetas de SWAPI" };
      }
    }
  }
};
module.exports = { getPlanets, getPlanetsById };
