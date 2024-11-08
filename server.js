const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
// Aqui lo que hace es validar si la tabla existe.
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
}); 

//esto descomentarlo despues de crear la ruta para que se pueda leer
let router = require('./app/routers/proyecto.router.js');

const cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:4200','https://examenfinalfront.onrender.com'],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
//luego se descomenta la linea para usar la ruta
app.use('/', router);
app.get("/",(req,res) => {
  
  res.json({mesage:"Bienvenido Estudiante Jonatan Ajanel Gonzalez al examen Final de Desarrollo Web"});
})

// Creando el servidor para consumir la API
const server = app.listen(8080, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port); 
  })