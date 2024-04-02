const express = require("express");
const UserRouter = express.Router();
const { getUser, getAllUser, createUser, updateUser, deleteUser } =
    require("../controllers/UserContoller");
const { sanityMiddleWare } = require("../middleware/sanityReqObj");

UserRouter.route("/")
// admin
    .post(sanityMiddleWare,createUser)
//  admin
    .get(getAllUser);
// 2. get the user
UserRouter.route(":/id")
    .get(getUser)
    // admin, user
    .patch(updateUser)
    // admin , user
    .delete(deleteUser);
module.exports = UserRouter;
