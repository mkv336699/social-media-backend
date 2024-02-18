const getUsers = async () => {
    try {
        const UserModel = require("../models/User");
        const users = await UserModel.find();
        return users;
    } catch (error) {
        throw (error);
    }
}

const getUserById = async (username) => {
    try {
        const UserModel = require("../models/User");
        const user = await UserModel.findOne({ username }).lean();
        if (user)
            return user;
        throw ("User not found");
    } catch (error) {
        throw (error);
    }
}

const addUser = async (userObj) => {
    try {
        const UserModel = require("../models/User");
        const addedUser = await new UserModel(userObj).save();
        if (addedUser)
            return addedUser;
        throw ("User not added");
    } catch (error) {
        throw (error);
    }
}

const updateUser = async (userObj, username) => {
    try {
        const UserModel = require("../models/User");
        const updatedUser = await UserModel.findOneAndUpdate({ username }, userObj);
        console.log("updatedUser", updatedUser);
        if (updatedUser) {
            return updatedUser
        }
        throw ("User not found");
    } catch (error) {
        throw (error);
    }
}

const deleteUser = async (username) => {
    try {
        const UserModel = require("../models/User");
        const deleteStatus = await UserModel.deleteUser({ username });
        return deleteStatus;
    } catch (error) {
        throw (error);
    }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser }