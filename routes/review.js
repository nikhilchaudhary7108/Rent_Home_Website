const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware.js");
// const Review = require("../models/reviews.js");
// const Listing = require("../models/listing.js");
const reviewcontroller=require("../controllers/reviews.js");


// POST route to add review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewcontroller.createreview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewcontroller.deletereviews));

module.exports = router;
