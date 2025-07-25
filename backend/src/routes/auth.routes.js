import express from "express"
import { login, logout, onBoard, signup } from "../contollers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router(); 

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.post("/onboarding", protectRoute, onBoard)


// check if user is authenticated of not 
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user})
})

export default router