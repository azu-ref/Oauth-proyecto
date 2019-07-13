const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { config } = require('./config');

const app = express();

//body parser
app.use(bodyParser.json());

//firma del token y autenticacion
app.post("/api/auth/token", function( req, res ) {
    const { email, username, name } = req.body;
    const token = jwt.sign({
        sub: username,
        email,
        name
    },
    config.authJwtSecret); //creamos el token. sign = firmar
    res.json({ acces_token: token });
});

const server = app.listen('5000', () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});