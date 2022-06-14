const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    //minimum amount of light or too cold temp for planet to be habitable
    planet["koi_insol"] < 1.11 &&
    //max amount of light or too hold temp for planet to be habitable
    planet["koi_prad"] < 1.6
    //planet radius < 1.6 earth radii.
  );
}
/*
const promise = new Promise((resolve,reject)=> {
  resolve(42)
});
promises.then((result)=> {

});

const result = await promise

console.log(result)
*/
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(
          `done...${habitablePlanets.length} habitable planets found`
        );
        resolve();
      });
  });
}
module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
