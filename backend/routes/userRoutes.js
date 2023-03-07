const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT  = require("../middleware/authMiddleware");
const requestLimiter = require("../middleware/requestLimiter");
const { upload }= require("../utils/cloudnary");

router.route("/register").post(userController.registerUser);

router
  .route("/resend/email")
  .post(requestLimiter, userController.resendVerifyEmail);

//this will apply protected middleware(require access token) to all private routes below//put public user routes above
router.use(verifyJWT);

router.route("/").get(userController.getUser);

router
  .route("/:id")
  .patch(upload.single('profilePic'), userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
