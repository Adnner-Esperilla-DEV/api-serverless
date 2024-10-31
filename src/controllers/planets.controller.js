const { getPlanets, getPlanetsById } = require("../services/swapiService");
const getPlanetsSwapi = async (req, res) => {
  const data = await getPlanets();
  res.status(200).json({
    success: true,
    data,
  });
};
const getPlanetsSwapibyId = async (req, res) => {
  const idPlanet = parseInt(req.params.id);
  const data = await getPlanetsById(idPlanet);
  
  if (data.error) {
    return res.status(data.status).json({
      success: false,
      error: data.error.detail,
    });
  }
  res.status(200).json({
    success: true,
    data,
  });
};
module.exports = {
  getPlanetsSwapi,
  getPlanetsSwapibyId,
};
