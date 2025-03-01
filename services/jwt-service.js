const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

const generateAuthToken = (user) => {
    const authToken = jwt.sign({ user }, SECRET_KEY, { expiresIn: 24 * 60 * 60 });
    const refreshToken = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1d" });
    return { authToken, refreshToken }
}

const generateRefreshToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, SECRET_KEY);
        const accessToken = jwt.sign(decoded.user, SECRET_KEY, { expiresIn: '1h' });
        return Promise.resolve({ accessToken });
    } catch (error) {
        console.log("generateRefreshToken error,", );
        return Promise.reject(error.toString());
    }
}

module.exports = { generateAuthToken, generateRefreshToken }