const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");
const sqlite3 = require("sqlite3");
const alphaDb = sqlite3.verbose().Database;
const alphaPath = new alphaDb("./src/databases/alpha.db");
const httpServer = http.createServer();
const websocketServer = new WebSocketServer({ server: httpServer });

websocketServer.on("connection", (socket) => {
 // parâmetro socket da callback é a própria conexão
 socket.on("message", (message) => {
  saveDataToDb(convertMessageToJson(message));
 })
})

function convertMessageToJson(buffer) {
 const message = buffer.toString();
 return JSON.parse(message);
}

const insertQuery = "INSERT INTO coordinate (LATITUDE, LONGITUDE, COMMENT) VALUES (?, ?, ?)";

function saveDataToDb(data) {
 try {
  alphaPath.run(insertQuery, [data.latitude, data.longitude, data.comment], (err) => {
   console.log(err)
  })
 } catch (err) {
  console.log(err)
 }
}

httpServer.once("listening", () => {

 const query = "CREATE TABLE IF NOT EXISTS coordinate(ID INT AUTO INCREMENT PRIMARY KEY, LATITUDE VARCHAR NOT NULL, LONGITUDE VARCHAR NOT NULL, COMMENT VARCHAR(512) NOT NULL)";

 alphaPath.exec(query, (err) => {
  if (err) {
   console.log(err);
  }
  console.log("Your shitty query was executed, loser!")
 });
})

httpServer.listen(8090, () => {
 console.log("Server is fucking running! =D")
});