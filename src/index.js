const express = require("express");
const server = express();
const routes = require('./routes')
const PORT = 4000;
const cors = require('cors');
const { initDB } = require('./services/db.js')

server.use(cors());
server.use(express.json());

//routes
server.use("/api", routes);


server.listen(PORT, () => {
  initDB()
  console.log(`El servidor esta escuchando en el puerto: ${PORT}`);
});