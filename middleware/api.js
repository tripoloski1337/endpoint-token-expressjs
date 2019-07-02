const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const jwtMW = exjwt({
    secret: 'arsalan'
});

module.exports = jwtMW