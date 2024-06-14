const express = require('express');
const {getConnection} = require('./src/DB/conection_Mongoose');
const cors = require('cors');

const { validateToken } = require('./src/middleware/validateToken');
//const { rolAccess } = require('./src/middleware/validarRol');

require('dotenv').config();

const app = express();

app.use (cors 
    ({
        origin: '*'
    })
);

getConnection();


//parseo JSON

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use('/usuario', validateToken, require('./src/routes/usuario'));
app.use('/tipo-equipo', validateToken, require('./src/routes/TipoEquipo'));
app.use('/marca',validateToken, require('./src/routes/marca'));
app.use('/estado-equipo', validateToken, require('./src/routes/EstadoEquipo'));
app.use('/inventario', validateToken, require('./src/routes/inventario'));

app.use('/login', require('./src/routes/auth'))

module.exports = app;

