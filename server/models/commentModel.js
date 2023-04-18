const mongoose = require('mongoose');
const Joi = require('joi');


// Create a comment schema
const CommentModel = new mongoose.Schema({
    user_id: {
        type: String,
    },
    date_created: {
        type: Date,
        default: new Date(Date.now()),
    },
    info: {
        type: String,
    },
    img_url: {
        type: String,
    },
    user_name: {
        type: String,
    },
    recipe_id: {
        type: String,
    },
});

// Create a comment model
exports.CommentModel = mongoose.model("comments", CommentModel)

// Validate comment using Joi
exports.validateComment = (comment) => {
    const schema = Joi.object({
        info: Joi.string().min(1).max(9999).required(),
    });
    return schema.validate(comment);
}


