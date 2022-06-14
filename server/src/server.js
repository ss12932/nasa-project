const http = require("http");
const { start } = require("repl");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
  });
}
startServer();
// app.listen();

//front end runs on port 3000 by default, run on 8000 to avoid conflictions
// console.log(PORT);
