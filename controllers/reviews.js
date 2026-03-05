const Listing=require("../models/listing");
const Review=require("../models/reviews");


module.exports.createreview=async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review created");
    res.redirect(`/listings/${listing._id}`);
    console.log("validateReview:", validateReview);
console.log("isLoggedIn:", isLoggedIn);

console.log("wrapAsync:", wrapAsync);

}

module.exports.deletereviews=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review was deleted");
    res.redirect(`/listings/${id}`);
    console.log("isReviewAuthor:", isReviewAuthor);
}