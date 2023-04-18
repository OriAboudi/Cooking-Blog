const express = require("express");
const { auth } = require("../middlewares/atuh");
const { validateComment, CommentModel } = require("../models/commentModel");
const { RecipeModel } = require("../models/recipeModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();
// main route  

router.get("/", (req, res) => {
    res.json({ msg: "Welcome to my comments " });
}) 

router.get("/:recipeId", auth, async (req, res) => {

    try {
        let data = await CommentModel.find({ recipe_id: req.params.recipeId })
            .limit(50)
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
  
router.post('/:recipeId', auth, async (req, res) => {   
    let validBody = validateComment(req.body)
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    try {

        let user = await UserModel.findById(req.tokenData._id);
        if (user) {

            const recipeId = req.params.recipeId;
            const { info } = req.body;


            const newComment = new CommentModel({
                recipe_id: req.params.recipeId, 
                user_id: req.tokenData._id,
                info,
                img_url: user.profileImg,
                user_name: user.fullName 
            })
            await newComment.save();

            let recipe = await RecipeModel.findOne({ _id: recipeId })
            recipe.comments_id.push(newComment._id);
            await recipe.save();

            res.status(201).json({ newComment, recipe });


        }

    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.put('/update/:commentId', auth, async (req, res) => {
    let validBody = validateComment(req.body);
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    try {
        let commentId = req.params.commentId;
        let updated = req.body
        let data = await CommentModel.updateOne({ _id: commentId }, updated)
        res.status(200).json({ data, updated })
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.delete('/del/:delId', auth, async (req, res) => {
    try {
        let delId = req.params.delId
        let data = await CommentModel.deleteOne({ _id: delId })
        res.status(200).json({ data, msg: "comment deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})





module.exports = router;