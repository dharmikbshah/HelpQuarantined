const User = require('../models/User.model.js');

async function findNearbyUsers(latitude, longitude, SEARCH_RADIUS) {

    return User.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: SEARCH_RADIUS
            }
        },
        isVerified: true,
        isQuarantined: true
    }).exec();

}

async function getUserById(id)
{
    return User.findOne({ _id: id }).exec();
}

async function getUserByEmailId(user_email)
{
    return User.findOne({ user_email: user_email}).exec();
}

async function updateUserById(id,doc)
{
    return User.findByIdAndUpdate(id, doc, { new: true }).exec();
}

async function deleteUserById(id)
{
    return User.findByIdAndDelete(id).exec();
}

async function addNewUser(user)
{
    return User.create(user);
}

module.exports = {
    findNearbyUsers,
    getUserById,
    updateUserById,
    getUserByEmailId,
    deleteUserById,
    addNewUser
};