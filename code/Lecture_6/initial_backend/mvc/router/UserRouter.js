const express = require("express");
const UserRouter = express.Router();
const { getUser, getAllUser, createUser, updateUser, deleteUser } =
    require("../controllers/UserContoller");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");
UserRouter.route("/")
    .post(sanityMiddleWare, createUser)
    .get(getAllUser);
// 2. get the user
UserRouter.route(":/id")
    .get(getUser).patch(updateUser)
    .delete(deleteUser);
module.exports = UserRouter;
