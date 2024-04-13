//importing mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
//defining schemas for saving in db
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    }
})
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

//difing the created schema into a variable
const UserModel = mongoose.model("users", UserSchema)

//exporting the model
module.exports = UserModel