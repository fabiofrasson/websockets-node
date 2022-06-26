const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");
const sqlite3 = require("sqlite3");
const alphaDb = sqlite3.verbose().Database;
const alphaPath = new alphaDb("./src/databases/alpha.db");
const httpServer = http.createServer();