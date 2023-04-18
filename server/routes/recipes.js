
const express = require("express");


const { auth } = require("../middlewares/atuh");
const { CategoryModel } = require("../models/categoryModel");
const { RecipeModel, validateRecipe } = require("../models/recipeModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();
//TODO: Creat route of pages

router.get("/", async (req, res) => {
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 9;

    try {
        let data = await RecipeModel.find().populate('comments_id')
            .limit(perPage)
            .skip((page - 1) * perPage)

        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
router.get("/graphRating", async (req, res) => {
    try {
        let data = await RecipeModel.find({})
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/search", async (req, res) => {
    const skip = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    let searchQ = req.query.s;
    let searchExp = new RegExp(searchQ, "i")

    try {
        let data = await RecipeModel.find({ $or: [{ name: searchExp }, { info: searchExp }] })
            .skip((skip - 1) * limit)
            .limit(limit)
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/:id", async (req, res) => {
    try {
        let data = await RecipeModel.findOne({ _id: req.params.id }).populate('comments_id')
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/recipeUser", auth, async (req, res) => {

    try {
        let data = await RecipeModel.find({ _id: req.tokenData._id })
            .limit(perPage)
            .skip((page - 1) * perPage)
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/rating", auth, async (req, res) => {
    try {
        let data = await RecipeModel.find({ rating: { $gt: 4 } })
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/recentRecipe", auth, async (req, res) => {
    try {
        let data = await RecipeModel.find({})
            .limit(4)
            .sort({ [date_created]: -1 })

        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})



router.get("/pages/count", async (req, res) => {
    let perPage = Number(req.query.perPage) || 9;
    let category = req.query.category;
    let searchQ = req.query.s;
    let searchExp = new RegExp(searchQ, "i")

    let userId = req.query.id
    try {
        let findQuery = {};

        if (userId) {
            findQuery = { user_id: userId }
        } else if (category) {
            findQuery.category = category;
        } else if (searchQ) {
            findQuery = { $or: [{ name: searchExp }, { info: searchExp }] }

        }

        let count = await RecipeModel.countDocuments(findQuery);
        let pages = Math.ceil(count / perPage);
        res.json({ count, pages })

    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

//TODO: creaet a route that return all recipes with query ingredents

router.post('/', auth, async (req, res) => {
    let validBody = validateRecipe(req.body)
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    const categories = req.body.category;

    try {

        const dataObj = req.body;
        dataObj.user_id = req.tokenData._id;
        delete dataObj.category;
        let data = {};
        for (let i = 0; i < categories.length; i++) {
            dataObj.category = categories[i].value;
            data = new RecipeModel(dataObj)
            await data.save();

            let user = await UserModel.findById(req.tokenData._id);

            user.recipe_id.push(data._id);
            await user.save()

            let category = await CategoryModel.findOne({ url_code: data.category })

            category.recipe_of_cat_id.push(data._id);
            await category.save();
        }
        res.status(201).json(data);


    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.put('/update/:id', auth, async (req, res) => {
    let validBody = validateRecipe(req.body);
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    try {
        let id = req.params.id;
        let updated = req.body
        let data = await RecipeModel.updateOne({ _id: id }, updated)
        res.status(200).json({ data, updated })
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.delete('/del/:id', auth, async (req, res) => {
    try {
        let id = req.params.id
        let data = await RecipeModel.deleteOne({ _id: id })
        res.status(200).json({ data, msg: "recipe deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})


module.exports = router;