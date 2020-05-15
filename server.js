const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
//const { ExpressPeerServer } = require("peer");
const port = process.env.PORT || 9000;

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res, next) => res.send("Hello world!"));

// =======
srv = app.listen(9000);
/*const server = app.listen(port);*/
const peerServer = require("peer").ExpressPeerServer(srv, {
  debug: true,
});

app.use("/peerjs", peerServer);

peerServer.on("connection", (client) => {
  console.log(client.id + " has connected to the PeerServer");
});

module.exports = app;
