const UserModel = require('../models/user.model');

exports.createUser = (user) => {
    return UserModel.create(user);
}

exports.findUserByEmail = (email) => {
    return UserModel.findOne({ email: email })
}

exports.findUserById = (id) => {
    return UserModel.findById(id);
}
