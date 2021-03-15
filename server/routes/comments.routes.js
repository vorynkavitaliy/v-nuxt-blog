const { Router } = require("express");
const {create} = require('../controlers/comment.controler')
const router = Router();

router.post('/', create)

module.exports = router;