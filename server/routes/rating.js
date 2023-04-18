const express = require("express");
const { auth } = require("../middlewares/atuh");
const { RatingModel, validateRating } = require("../models/ratingModel");
const { RecipeModel } = require("../models/recipeModel");
const router = express.Router();
// main route 
router.get("/", (req, res) => {
    res.json({ msg: "Welcome to my rating " });
});

const calculateAverageRating = async (recipeId) => {

    const result = await RatingModel.aggregate([
        { $match: { recipe_id: recipeId } },
        {
            $group: {
                _id: '$recipe_id',
                averageRating: { $avg: '$rating' },
            },
        },
    ]);

    if (!result || result.length === 0) {
        throw new Error(`No ratings found for recipe with id ${recipeId}`);
    }

    return result[0].averageRating;
}

router.get("/:recipeId", auth, async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const averageRating = await calculateAverageRating(recipeId);
        res.json({ averageRating });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.post('/:recipeId', auth, async (req, res) => {
    let validBody = validateRating(req.body)
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    try {

        const { rating } = req.body;
        const recipeId = req.params.recipeId;

        // Create new rating document
        const newRating = new RatingModel({
            recipe_id: recipeId,
            rating,
            user_id: req.tokenData._id,
        });
        await newRating.save();

        // Update average rating for recipe
        const averageRating = await calculateAverageRating(recipeId);

        let recipe = await RecipeModel.findById({ _id: recipeId });
        recipe.rating = averageRating;
        recipe.save();
        res.json({ averageRating, recipe });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.put('/update/:recipeId/ratings/:ratingId', auth, async (req, res) => {
    let validBody = validateRating(req.body);
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    try {

        const recipeId = req.params.recipeId;
        const ratingId = req.params.ratingId;
        const { rating } = req.body;
        const updatedRating = await RatingModel.findByIdAndUpdate(ratingId, { rating }, { new: true });
        const averageRating = await calculateAverageRating(recipeId);
        res.json.status(200)({ rating: updatedRating, averageRating });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.delete('/del/:recipeId/ratings/:ratingId', auth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const ratingId = req.params.ratingId;
    try {
        // Remove rating document
        const deletedRating = await RatingModel.findByIdAndRemove(ratingId);

        // Update average rating for recipe
        const averageRating = await calculateAverageRating(recipeId);
        res.json({ averageRating });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})




module.exports = router;