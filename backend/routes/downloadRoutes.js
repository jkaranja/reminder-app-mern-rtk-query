
const express = require("express");
const router = express.Router();
const downloadController = require('../controllers/downloadController')
const verifyJWT = require("../middleware/authMiddleware");

//router.use(verifyJWT);
router.route('/single').post(downloadController.singleDownload)

router.route('/zip').post(downloadController.zipDownload)









module.exports = router;
