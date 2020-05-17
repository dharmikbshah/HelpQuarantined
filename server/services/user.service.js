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

module.exports = {
    findNearbyUsers,
    getUserById
};