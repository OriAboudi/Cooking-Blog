const mongoose = require('mongoose');
const Joi = require("joi");

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    img_url: {  
        type: String,
    },
    discription: {   
        type: String,
    },
    info: {
        type: String,
    },
    url_code: {
        type: String,
    },
    recipe_of_cat_id: [{ type: mongoose.Types.ObjectId, ref: 'recipes' }]

});
exports.CategoryModel = mongoose.model("categories", categorySchema);

exports.validateCategory = (myModel) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        discription: Joi.string().min(2).max(255).required(),
        img_url: Joi.string().uri().required(),
        info: Joi.string(),
        url_code: Joi.string().min(2).max(255).required()

    });
    return schema.validate(myModel);
}


