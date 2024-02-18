const app = module.exports = require('express')();
const { generateAuthToken } = require("../services/jwt-service");
const { login, signUpUser } = require("../actions/auth");
const { generateRefreshToken } = require("../services/jwt-service");

app.post("/login", (req, res) => {
    login(req.body.username, req.body.password).then(data => {
        const { authToken, refreshToken } = generateAuthToken(data);
        res.send({ status: "SUCCESS", data: { user: data, authToken, refreshToken } });
    }).catch(error => {
        res.send({ status: "FAIL", error });
    });
});

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
        res.status(401).send({ status: "SUCCESS", error: 'Access Denied. No refresh token provided.' });

    generateRefreshToken(refreshToken).then(data => {
        res.send({ status: "SUCCESS", data });
    }).catch(error => {
        res.send({ status: "FAIL", error });
    });
});

app.post('/signup', (req, res) => {
    signUpUser(req.body).then(data => {
        res.send({ status: "SUCCESS", data });
    }).catch(error => {
        res.send({ status: "FAIL", error });
    });
});