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
    res.json({ access_token: token });
});

app.get("/api/auth/verify", function (req, res, next) {
    const { access_token } = req.query;

    try {
        const decoded = jwt.verify(access_token, config.authJwtSecret);
        res.json({message: "The acces token is valid", username: decoded.sub})
    } catch (error) {
        next(error);
    }
});

const server = app.listen('5000', () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});