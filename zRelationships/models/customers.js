const mongoose =require("mongoose");
const mongo_url = "mongodb://127.0.0.1:27017/relationdemo";
const {Schema}=mongoose;



main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
};

const orderschema = new Schema({
    item:String,
    price:String,
});

const customerschema = new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"order",
        }
    ]});

const order =mongoose.model("order",orderschema);
const customer=mongoose.model("customer",customerschema);


const addcustomer = async () => {
    // let cust1 = new customer({ name: "hanumanth" });

    // let order1 = await order.findOne({ item: "biryani" });
    // let order2 = await order.findOne({ item: "gulabjam" });

    // if (order1) cust1.orders.push(order1._id);
    // if (order2) cust1.orders.push(order2._id);

    // let result = await cust1.save();
    let result=await customer.find({}).populate("orders");
    console.log(result);
};

addcustomer();

//population 
//is the automatically replacing the specified path in the document
//with documentss from other collections

// const addorders=async()=>{
//     let res=await order.insertMany([
//         {item:"laddu",price:50},
//         {item:"idli",price:90},
//         {item:"biryano",price:150},
//         {item:"gulabjam",price:100},
//     ]);
//     console.log(res);
// };
// addorders();