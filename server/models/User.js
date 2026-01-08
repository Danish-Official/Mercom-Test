const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
name: String,
email: { type: String, unique: true },
password: String
});


userSchema.pre('save', async function () {
this.password = await bcrypt.hash(this.password, 10);
});


module.exports = model('User', userSchema);