const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController =require("../controllers/listings.js");
const multer =require("multer");
const upload=multer({dest :"uploads/"});

router
  .route("/")
  .get(wrapasync(listingController.index))
  // .post(isLoggedIn, validateListing, wrapasync(listingController.createlistings));
.post(upload.single('listing[image]'),(req,res)=>{
  res.send(req.file);
})
  // New form route
router.get("/new", isLoggedIn,listingController.rendernewform);

router.route("/:id")
.get(wrapasync(listingController.showlistings))
.put(isLoggedIn,isOwner,validateListing, wrapasync(listingController.updatelistings))
delete(isLoggedIn,isOwner,wrapasync(listingController.deletelistings));

// Edit form
router.get("/:id/edit",isLoggedIn,isOwner, wrapasync(listingController.editlisting));

module.exports = router;
