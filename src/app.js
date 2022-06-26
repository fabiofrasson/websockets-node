const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");
const sqlite3 = require("sqlite3");
const alphaDb = sqlite3.verbose().Database;
const alphaPath = new alphaDb("./src/databases/alpha.db");
const httpServer = http.createServer();
const websocketServer = new WebSocketServer({ server: httpServer });

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