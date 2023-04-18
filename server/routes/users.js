const express = require("express"); //Express module
const bcrypt = require("bcrypt"); //Bcrypt module
const { validateUser, UserModel, validateLogin, genToken } = require("../models/userModel"); //import funcs from userModel
const { auth } = require("../middlewares/atuh"); //import funcs from auth to valid token
const { PasswordResetModel } = require("../models/passwordResetModel");
const { sendResetPasswordEmail } = require("../helpers/sendEmail");
const router = express.Router(); //to create Route

router.get("/", async (req, res) => { //Get request users
    try {
        const users = await UserModel.find({})
        res.status(200).json(users);

    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

// A route that will be used to test if the token is still valid or reliable
router.get("/authUser", auth, async (req, res) => {
    try {
        res.json({ status: "ok", msg: "token valid", role: req.tokenData.role })
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

//A router that will be used to return the user's details
router.get("/userInfo", auth, async (req, res) => {
    let skip = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 9;
    skip = ((skip - 1) * limit)
    try {
        let data = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 }).populate({
            path: 'recipe_id',
            options: {
                skip,
                limit
            }
        })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
    // Should return information of name, address
})

router.get("/userFavorite", auth, async (req, res) => {
    try {
        let data = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0, recipe_id: 0 }).populate('fav_id')
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get("/getFav", auth, async (req, res) => {
    try {
        let data = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 }).populate("fav_id")
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
    // Should return information of name, address
})
// Create a new User
router.post("/signup", async (req, res) => {
    console.log(req.body)

    let validBody = validateUser(req.body); //validation the request of Create user
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body); // create new user from the model by RequestBody(object) 
        //Encryption (bcrypt.hash(user.password, Encryption level))
        user.password = await bcrypt.hash(user.password, 10); //Encryption the password of the user by bcrypt module
        await user.save(); // save the user/object in database
        user.password = "******"; //before send json need to hide the Encryption of the password
        res.status(201).json({ msg: "User creaced" });

    } catch (err) {
        if (err.code == 11000) { // if the email is already (Email Uniqe)
            return res.status(400).json({ code: 11000, err_msg: "Email already exist" })
        }
        console.log(err);
        res.status(500).json(err);
    }
})

//A router that will be used to login user
router.post("/login", async (req, res) => {
    let validBody = validateLogin(req.body); //validation the request of Login user
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ err_msg: "Email or password invalid" });
        }
        //compatibility passwords between req.body.password to user.password
        let validPassword = await bcrypt.compare(req.body.password, user.password); // compatibility passwords of bcrypt
        if (!validPassword) { //if not compatibility
            return res.status(401).json({ err_msg: "Email or password invalid" });
        }
        // create a token, the token get the user._id
        let token = genToken(user)



        res.json({ token, role: user.role }); //res.json({ token }) equal to res.json({ token:token })
        // At the end we will need to send a token to the user
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
router.post("/toggleFav", auth, async (req, res) => {
    try {
        let user = await UserModel.findById(req.tokenData._id);
        let status = req.body.status

        if (status == 1) {
            user.fav_id.push(req.body._id);
            await user.save();
            return res.status(200).json({ mag: 'recipe added successfully' });
        } else {

            let newArrFav = user.fav_id.filter(item => item != req.body._id);
            user.fav_id = newArrFav;
            await user.save();
            res.status(200).json({ msg: 'deleted' });

        }

    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
// router.put("/removeFav", auth, async (req, res) => {
//     try {
//         let user = await UserModel.findById(req.tokenData._id);
//         let newArrFav = user.fav_id.filter(item => item != req.body._id);
//         user.fav_id = newArrFav;
//         user.save();
//         res.status(200).json({ msg: 'deleted', user });

//     }
//     catch (err) {
//         console.log(err);
//         res.status(502).json({ err })
//     }


// })

router.post('/requestPasswordReset', async (req, res) => {
    try {
        const { email, redirectUrl } = req.body;
        if (!email || !redirectUrl) {
            return res.status(400).json({ status: "failed", message: "Please provide email and redirectUrl" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: "failed", message: "No account with the supplied email found. Please try again" });
        }

        sendResetPasswordEmail(user, redirectUrl, res);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


})


router.post('/resetPassword', async (req, res) => {
    const { userId, resetString, newPassword } = req.body;
    let result = await PasswordResetModel.findOne({ userId });
    if (!result) {
        return res.status(401).json({ msg: "Invalid password details or Password reset request not found 1" });
    }

    const { expiresAt } = result;

    //If Expired
    if (expiresAt < Date.now() + 2 * 60 * 60 * 1000) {
        // checking if link expired
        await PasswordResetModel.deleteOne({ userId });
        return res.status(401).json({ err_msg: "Password reset link as expired 2" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    result = await bcrypt.compare(resetString, result.resetString);
    if (!result) {
        return res.status(400).json({ err_msg: "Invalid password details or Password reset request not found 3" });
    }

    const update = await UserModel.updateOne({ _id: userId }, { password: hashedPassword });
    if (update.matchedCount == 0) {
        return res.status(500).json({ err_msg: "Internal Error 4" });
    } else if (update.modifiedCount == 0) {
        return res.status(500).json({ err_msg: "Internal Error 5" });
    }


    await PasswordResetModel.deleteOne({ userId });
    return res.status(200).json({ status: "Success", msg: "Password updated successfully 6" });



})

module.exports = router;