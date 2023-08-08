const router = require("express").Router();
const { User } = require("../db/index");

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
