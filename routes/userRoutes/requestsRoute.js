const express=require("express");
const router=express.Router();
const {handleRequests, acceptRequest}=require("../../controllers/userControllers/requestsController");
router.route("/acceptRequest/:userid").post(acceptRequest);
router.route("/handleRequest/:userid").post(handleRequests);
module.exports=router;