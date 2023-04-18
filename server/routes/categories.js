
const express = require("express");
const { auth } = require("../middlewares/atuh");

const { CategoryModel, validateCategory } = require("../models/categoryModel");
const router = express.Router();





router.get("/", async (req, res) => {
    try {
        let data = await CategoryModel.find({})
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
router.get("/nameAndCat", async (req, res) => {
    try {
        let data = await CategoryModel.find({}).select("name url_code")
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})


router.get("/byPop", async (req, res) => {
    let skip = Number(req.query.skip) || 1;
    let limit = Number(req.query.limit) || 12;
    skip = ((skip - 1) * limit)

    try {
        let data = await CategoryModel.find().populate({
            path: 'recipe_of_cat_id',
            options: {
                skip,
                limit,

            }
        })
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
router.get('/byCode/:url_code', async (req, res) => {
    let skip = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 12;
    skip = ((skip - 1) * limit)
    try {
        let category = req.params.url_code;
        let data = await CategoryModel.findOne({ url_code: category }).populate({
            path: 'recipe_of_cat_id',
            options: {
                skip,
                limit
            }
        })
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
router.get("/:id", async (req, res) => {
    let skip = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 12;
    try {
        let _id = req.params.id
        let data = await CategoryModel.findOne({ _id: _id }).populate({
            path: 'recipe_of_cat_id',
            options: {
                skip,
                limit
            }
        })

        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
router.post('/', auth, async (req, res) => {
    let validBody = validateCategory(req.body)
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    try {
        let data = new CategoryModel(req.body);

        await data.save();
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
router.put('/update/:id', auth, async (req, res) => {
    let validBody = validateCategory(req.body)
    if (validBody.error) {
        return res.status(500).json(validBody.error.details)
    }
    try {
        let _id = req.params.id;
        let data = await CategoryModel.updateOne({ _id }, req.body)
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
router.delete('/del/:id', auth, async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await CategoryModel.deleteOne({ _id: _id });
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }

})

//tasting dane!
module.exports = router;