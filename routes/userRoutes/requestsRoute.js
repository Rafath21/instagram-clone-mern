const express=require("express");
const router=express.Router();
const {handleRequests, acceptRequest, deleteRequest}=require("../../controllers/userControllers/requestsController");
const {isAuthenticated}=require("../../middlewares/auth");
router.route("/acceptRequest/:userid").post(isAuthenticated,acceptRequest);
router.route("/handleRequest/:userid").post(isAuthenticated,handleRequests);
router.route("/deleteRequest/:userid").delete(isAuthenticated,deleteRequest);
module.exports=router;