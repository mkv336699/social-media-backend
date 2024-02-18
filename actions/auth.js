const { getUserById } = require("./user");

const login = async (username, password) => {
    try {
        if (username && password) {
            const user = await getUserById(username).catch(error => { throw (error) });
            if (username === user.username && password === user.password)
                return user;
            throw ("Incorrect username or password");
        } else {
            throw ("Incorrect username or password 2")
        }
    } catch (error) {
        console.log("catch", error);
        return Promise.reject(error.toString());
    }
}

const signUpUser = async (userObj) => {
    try {
        if (!userObj) {
            throw ("User object required");
        }
        let errorKey = "";
        if (!userObj.username) errorKey = "username is required";
        if (!userObj.password) errorKey = "password is required";
        if (!userObj.name) errorKey = "name is required";
        if (!userObj.dateOfBirth) errorKey = "dateOfBirth is required";
        if (errorKey !== "") throw(errorKey);

        const UserModel = require("../models/User");
        const addedUser = await new UserModel(userObj).save();
        if (addedUser)
            return addedUser;
        throw ("User not added");
    } catch (error) {
        if (error.toString().includes("duplicate key error"))
            return Promise.reject("User with same username already exists");
        return Promise.reject(error.toString());
    }
}

module.exports = { login, signUpUser }