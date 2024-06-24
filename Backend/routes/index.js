const express = require("express");
const userRouter = require("./user");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");

const signupSchema = zod.Schema({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.use("/user", userRouter);
router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    res.json({
      message: "Email already Exits / invalid Token",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
  });
  if (user._id) {
    res.json({
      message: "Email already Exits / invalid Token",
    });
  }
  const dbUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    user: "user created successfully",
    token:token,
  });
});

module.exports = router;
