const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: String,
    user_contact: String,
    user_email: String,
    hashed_password: String,
    salt: { type: String, default: '' },
    token: Number,
    token_created_at: String,
    user_address: String,
    user_city: String,
    isQuarantined: { type: Boolean, default: false },
    required_items: [{ item_name: String, item_quantity: String }],
    location: {
      type: {
        type: String, 
        enum: ['Point'] // 'location.type' must be 'Point'
      },
      coordinates: {
        type: [Number]
      }
    },
    isVerified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }, 
});
mongoose.model('User', userSchema, 'User');
module.exports = mongoose.model('User');
