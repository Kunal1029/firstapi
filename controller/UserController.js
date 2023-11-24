const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dd8z9exss',
    api_key: '243842292493175',
    api_secret: 'aXNApGt5v7lN9cm6WOGIkACXDtI'
});


class UserController {
    static getalluser = async (req, res) => {
        try {
            res.send('HI')
        } catch (error) {
            console.log(error)
        }
    }

    static userinsert = async (req, res) => {

        const file = req.files.image //upload folder to image cloudinary
        const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'profileImageApi'
        });

        const { n, e, ps, cps } = req.body
        const user = await userModel.findOne({ email: e }) // here 'email ' are comes from model and 'e' comes where user fill email during filling form

        // console.log(user)

        if (user) {
            res
                .status(401)
                .json({ status: "failed", message: "THIS EMAIL IS ALREADY EXITS :-( " });
        }

        else {
            if (n && e && ps && cps) {
                if (ps === cps) {
                    const hashpassword = await bcrypt.hash(ps, 10)
                    const result = new userModel({
                        name: n,
                        email: e,
                        // phone: ph,
                        password: hashpassword,
                        confirm_password: hashpassword,
                        image: {
                            public_id: imageupload.public_id,
                            url: imageupload.secure_url
                        }
                    })
                    await result.save()
                    res
                        .status(201)
                        .json({ status: "success", message: "Registration Successfully" });
                }
                else {
                    res
                        .status(401)
                        .json({ status: "failed", message: "Password and confirm password does not match" });
                }
            }
            else {
                res
                    .status(401)
                    .json({ status: "failed", message: "All field required" });
            }
        }
    }

}

module.exports = UserController