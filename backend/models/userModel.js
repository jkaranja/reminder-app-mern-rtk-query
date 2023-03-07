const mongoose = require("mongoose");
// unique: true,//don't use unique//no custom error//creates extra index//check in controller
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    phoneNumber: { type: String },
    profileUrl: { type: String }, //image url on cloud nary
    roles: { type: [String], default: ["admin"] }, //arr of strings
    newEmail: { type: String },
    verified: { type: Boolean, default: false },
    verifyEmailToken: { type: String },
    resetPasswordToken: [], //{type:[String, Number]}//don't support tuple
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);

//mongoose returned object has methods like save or remove//you can add more
//here we add match password, this refers to the doc/object returned
//compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
// //// will encrypt password every time its saved//called before change
// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// const user = await User.findOne({ email });
//  if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       token: generateToken(user._id),
//     });

//     //in update and register, pass raw password and it will be hashed before save
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     if (req.body.password) {
//       user.password = req.body.password;    }
//     const updatedUser = await user.save();
//   }
