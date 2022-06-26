const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");
const sqlite3 = require("sqlite3");
const bravoDb = sqlite3.verbose().Database;
const bravoPath = new bravoDb("./src/databases/bravo.db");
const httpServer = http.createServer();
const websocketServer = new WebSocketServer({ server: httpServer });
const { token } = require("../constants");

websocketServer.on("connection", (socket) => {
 // parâmetro socket da callback é a própria conexão
 socket.on("message", (message) => {

  if (message.toString() == token) {
   socket.send(JSON.stringify(messagesOnMemory));
   return;
  }

  saveDataToDb(convertMessageToJson(message));
 })
})

const alphaServerConnection = new WebSocket("ws://localhost:8090");

alphaServerConnection.on("open", function () {
 this.send(token);
 // enviar o array,convertendo pra objeto e salvando cada elemento no DB
 this.on("message", (message) => {
  const messagesArr = convertMessageToJson(message);
  messagesArr.forEach(element => {
   console.log(element)
   saveDataToDb(convertMessageToJson(element));
  });
  alphaServerConnection.close();
 });
})

function convertMessageToJson(buffer) {
 const message = buffer.toString();
 console.log(message)
 return JSON.parse(message);
}

const insertQuery = "INSERT INTO coordinatesBravo (LATITUDE, LONGITUDE, COMMENT) VALUES (?, ?, ?)";

function saveDataToDb(data) {
 try {
  bravoPath.run(insertQuery, [data.latitude, data.longitude, data.comment], (err) => {
   console.log(err)
  })
 } catch (err) {
  console.log(err)
 }
}

httpServer.once("listening", () => {

 const query = "CREATE TABLE IF NOT EXISTS coordinatesBravo(ID INTEGER PRIMARY KEY AUTOINCREMENT, LATITUDE VARCHAR NOT NULL, LONGITUDE VARCHAR NOT NULL, COMMENT VARCHAR(512) NOT NULL)";

 bravoPath.exec(query, (err) => {
  if (err) {
   console.log(err);
  }
  console.log("Your shitty query was executed, loser!")
 });
})

httpServer.listen(8091, () => {
 console.log("Server is fucking running! =D")
});