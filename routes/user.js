const express =require("express");
const {handleUseSingup, handleUseLogin} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUseSingup);
router.post("/login", handleUseLogin);
module.exports = router