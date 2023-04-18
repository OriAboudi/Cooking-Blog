const { CategoryModel } = require("../models/categoryModel");
 


async function getPageCategory(pageNumber, pageSize) {
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;
    try {
        const data = await CategoryModel.find().populate({ path: 'recipe_of_cat_id', options: { skip, limit } }).slice('author', [skip, limit]).exec();
        const totalItems = await CategoryModel.countDocuments();

        return {
            data,
            totalPages: Math.ceil(totalItems / pageSize),
            currentPage: pageNumber,
        };
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }

}
module.exports = getPageCategory;
// async function getPage(pageNumber, pageSize) {
//     const skip = (pageNumber - 1) * pageSize;
//     const limit = pageSize;
//     try {
//         const data = await Book.find().populate('author').skip(skip).limit(limit).exec();
//         const totalItems = await Book.countDocuments();
//         return {
//             data,
//             totalPages: Math.ceil(totalItems / pageSize),
//             currentPage: pageNumber,
//         };
//     }
//     catch (err) {
//         console.log(err);
//         res.status(502).json({ err })
//     }


// }

async function getPage(pageNumber, pageSize) {
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const data = await Book.find().populate('author').skip(skip).limit(limit).exec();
    const totalItems = await Book.countDocuments();

    return {
        data,
        totalPages: Math.ceil(totalItems / pageSize),
        currentPage: pageNumber,
    };
}