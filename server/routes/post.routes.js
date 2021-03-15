const passport = require("passport");
const { Router } = require("express");
const upload = require('../middlewere/upload')
const ctr = require("../controlers/post.controler");
const router = Router();

// /api/post/admin/
router.post(
    "/admin/",
    passport.authenticate("jwt", { session: false }),
    upload.single('image'),
    ctr.createPost
);

router.get(
    "/admin/",
    passport.authenticate("jwt", { session: false }),
    ctr.getPosts
);

router.get(
    "/admin/:id",
    passport.authenticate("jwt", { session: false }),
    ctr.getPostById
);

router.put(
    "/admin/:id",
    passport.authenticate("jwt", { session: false }),
    ctr.updatePost
);

router.delete(
    "/admin/:id",
    passport.authenticate("jwt", { session: false }),
    ctr.removePost
);

router.get(
    "/admin/get/analytics",
    passport.authenticate("jwt", { session: false }),
    ctr.getAnalytics
)

// /api/post/

router.get("/", ctr.getPosts);
router.get("/:id", ctr.getPostById);
router.put("/add/view/:id", ctr.addView);

module.exports = router;
