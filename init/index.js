const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js"); 

const mongo_url = "mongodb://127.0.0.1:27017/test";

main()
  .then(() => {
    console.log("Connected to DB");
    inidbs(); 
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

const inidbs = async () => {
  try {
    console.log("➡️ Entered inidbs function");

    await Listing.deleteMany({});
    console.log("🗑️ Deleted all listings");

    console.log("📦 Raw initdata:", initdata); // confirm it has `data` key
    console.log("📦 Raw initdata.data:", initdata.data); // confirm it’s an array

    initdata.data = initdata.data.map((obj) => ({
      ...obj,
      owner: new mongoose.Types.ObjectId("67ee392e521d81dab7612020"),
    }));

    console.log("✅ Mapped initdata.data with owner");

    await Listing.insertMany(initdata.data);
    console.log("✅ Data was reinitialized");
  } catch (err) {
    console.error("❌ Error during data init:", err);
  }
};

