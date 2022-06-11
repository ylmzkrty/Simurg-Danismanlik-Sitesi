import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  paket: {
    type: String,
    required: true,
  },

  mail: {
    type: String,
    required: true,
  },

  purchaseDate: {
    type: Date,
    required: true,
    default: new Date()
  }


});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;

// Create Order
const createOrder = async (order: any) => {

  const doc = new orderModel({
    paket: order.body.paket,
    mail: order.user.mail,
    purchaseDate: new Date()
  });
  doc.save();

  return doc;
};



export { createOrder };
