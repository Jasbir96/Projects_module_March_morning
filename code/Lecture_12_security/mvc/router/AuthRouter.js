const express = require("express");
const AuthRouter = express.Router();
const { signupController, loginController,
    forgetPasswordController,
    resetPasswordController,
} = require("../controllers/Authcontroller");
const { protectRouteMiddleWare, checkIfAdminMiddleWare } = require("../middleware/authMiddleWare");

const { getAllUser, getUser } = require("../controllers/UserContoller");
AuthRouter.post("/signup", signupController);
AuthRouter.post("/login", loginController);
AuthRouter.patch("/forgetpassword", forgetPasswordController);
AuthRouter.patch("/resetPassword/:userId", resetPasswordController);
AuthRouter.get("/allowIfLoggedIn", protectRouteMiddleWare, getUser);
AuthRouter.get("/allowIfAdmin", protectRouteMiddleWare, checkIfAdminMiddleWare, getAllUser);

module.exports = AuthRouter;
