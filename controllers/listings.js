const Listing =require("../models/listing")


module.exports.index=async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });
  }

  
 module.exports.rendernewform =(req, res) => {
    res.render("listings/new.ejs");
  }


module.exports.showlistings=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:
      {path:"author"},})
      .populate("owner");
    if(!listing){
      req.flash("error","listing requested doesnot exist");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }

module.exports.createlistings=async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    await newlisting.save();
    req.flash("success","new listing was created");
    res.redirect("/listings");
  }

module.exports.editlisting=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","listing requested doesnot exist");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }
module.exports.updatelistings=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findById(id);
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("sucess","listing was updated");
    res.redirect(`/listings/${id}`);
  }    
module.exports.deletelistings=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("sucess","listing was deleted");
    res.redirect("/listings");
  }  