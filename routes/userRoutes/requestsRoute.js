const express=require("express");
const router=express.Router();
const {handleRequests, acceptRequest, deleteRequest}=require("../../controllers/userControllers/requestsController");
router.route("/acceptRequest/:userid").post(acceptRequest);
router.route("/handleRequest/:userid").post(handleRequests);
router.route("/deleteRequest/:userid").delete(deleteRequest);
module.exports=router;