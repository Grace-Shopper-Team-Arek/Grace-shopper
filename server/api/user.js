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

router.put("/:id", async (req, res, next) => {
    try {
        //first find user by PK instead of just calling User.update so you only 
        //update the row that is changing
        const userToUpdate = await User.findByPk(req.params.id.replace(":", ""));
        //why does the id include the colon? no clue, but it has to go for this to work
        //maybe quirk of using UUIDs instead of just integers?

        const updatedUser = await userToUpdate.update(req.body);

         res.end();
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request");
    }
});

module.exports = router;
