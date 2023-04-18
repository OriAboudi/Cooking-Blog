const mongoose = require('mongoose');
const Joi = require('joi');

// Create a rating schema
const RatingModel = new mongoose.Schema({
    recipe_id: {
        type: String,
    },
    rating: {
        type: Number,
    },
    user_id: {
        type: String,
    },
});

// Create a rating model
exports.RatingModel = mongoose.model('ratings', RatingModel);

// Validate rating using Joi
exports.validateRating = (rating) => {
    const schema = Joi.object({

      
        rating: Joi.number().integer().min(1).max(5).required(),

    });
    return schema.validate(rating);
}

