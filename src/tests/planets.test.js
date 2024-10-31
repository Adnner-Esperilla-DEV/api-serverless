const axios = require("axios");
const { getPlanets, getPlanetsById } = require("../services/swapiService");
const { planetMapping } = require("../utils/planetMapping");

jest.mock("axios");
// jest.mock('../src/helpers/transform');
const SWAPI_URL = "https://swapi.py4e.com/api/planets";
describe("getPlanets", () => {
  it("Debería obtener y transformar los datos de los planetas con éxito", async () => {
    const mockResponse = {
      data: {
        count: 61,
        next: "https://swapi.py4e.com/api/planets/?page=2",
        previous: null,
        results: [
          {
            name: "Tatooine",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
              "https://swapi.py4e.com/api/people/1/",
              "https://swapi.py4e.com/api/people/2/",
            ],
            films: [
              "https://swapi.py4e.com/api/films/1/",
              "https://swapi.py4e.com/api/films/3/",
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "https://swapi.py4e.com/api/planets/1/",
          },
        ],
      },
    };
    axios.get.mockResolvedValue(mockResponse);
    // // Mock axios.get to return the mock response
    // axios.get.mockResolvedValue(mockResponse);

    // Mock transformData function to return a transformed item
    // transformData((item) => ({
    //   transformedName: item.name,
    // }));
    // const transformData = jest.fn((item) => ({
    //   nombre: item.name,
    //   periodo_rotacion: item.rotation_period,
    //   periodo_orbital: item.orbital_period,
    //   diametro: item.diameter,
    //   clima: item.climate,
    //   gravedad: item.gravity,
    //   terreno: item.terrain,
    //   agua_superficial: item.surface_water,
    //   poblacion: item.population,
    //   residentes: item.residents,
    //   peliculas: item.films,
    //   creado: item.created,
    //   editado: item.edited,
    //   url: item.url,
    // }));
    const result = await getPlanets();

    expect(axios.get).toHaveBeenCalledWith(SWAPI_URL);
    expect(result).toEqual({
      cantidad: 61,
      siguiente: "https://swapi.py4e.com/api/planets/?page=2",
      anterior: null,
      resultados: [
        {
          nombre: "Tatooine",
          periodo_rotacion: "23",
          periodo_orbital: "304",
          diametro: "10465",
          clima: "arid",
          gravedad: "1 standard",
          terreno: "desert",
          agua_superficial: "1",
          poblacion: "200000",
          residentes: [
            "https://swapi.py4e.com/api/people/1/",
            "https://swapi.py4e.com/api/people/2/",
          ],
          peliculas: [
            "https://swapi.py4e.com/api/films/1/",
            "https://swapi.py4e.com/api/films/3/",
          ],
          creado: "2014-12-09T13:50:49.641000Z",
          editado: "2014-12-20T20:58:18.411000Z",
          url: "https://swapi.py4e.com/api/planets/1/",
        },
      ],
    });
  });
});
describe("getPlanetsById", () => {
  it("Debería obtener y transformar los datos del planeta con éxito", async () => {
    const mockResponse = {
        name: "Tatooine",
        rotation_period: "23",
        orbital_period: "304",
        diameter: "10465",
        climate: "arid",
        gravity: "1 standard",
        terrain: "desert",
        surface_water: "1",
        population: "200000",
        residents: [
          "https://swapi.py4e.com/api/people/1/",
          "https://swapi.py4e.com/api/people/2/",
        ],
        films: [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/3/",
        ],
        created: "2014-12-09T13:50:49.641000Z",
        edited: "2014-12-20T20:58:18.411000Z",
        url: "https://swapi.py4e.com/api/planets/1/",
    };
    const transformedData = {
      nombre: "Tatooine",
      periodo_rotacion: "23",
      periodo_orbital: "304",
      diametro: "10465",
      clima: "arid",
      gravedad: "1 standard",
      terreno: "desert",
      agua_superficial: "1",
      poblacion: "200000",
      residentes: [
        "https://swapi.py4e.com/api/people/1/",
        "https://swapi.py4e.com/api/people/2/",
      ],
      peliculas: [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/3/",
      ],
      creado: "2014-12-09T13:50:49.641000Z",
      editado: "2014-12-20T20:58:18.411000Z",
      url: "https://swapi.py4e.com/api/planets/1/",
    };
    axios.get.mockResolvedValue({ data: mockResponse });
    const result = await getPlanetsById(1);

    expect(axios.get).toHaveBeenCalledWith(`${SWAPI_URL}/1`);
    expect(result).toEqual(transformedData);
  });
});
