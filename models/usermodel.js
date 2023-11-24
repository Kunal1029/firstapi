const { default: mongoose } = require('mongoose')
const newUser = require('mongoose')
const userSchema = new newUser.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // phone:{
    //     type:Number,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    image:{
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },
    role:{
        type: String,
        default: 'user'
    }
},{timestamps:true})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel
