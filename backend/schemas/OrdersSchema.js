const{Schema}= require("mongoose");

const OrdersSchema= new Schema({
    userId: { type: String, required: true },
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    mode: String,
    

});

module.exports={OrdersSchema};