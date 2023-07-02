const { Router } = require("express");
const router = Router();

router.get("/", async (req,res,next) => {
    res.send("Hi")
})

module.exports = router;