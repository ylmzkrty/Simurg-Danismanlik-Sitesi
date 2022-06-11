import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  mail: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  ticketCreateDate: {
    type: Date,
    required: true,
    default: new Date()
  }


});

const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel;

// Create Ticket
const createTicket = async (body: any) => {

  const doc = new ticketModel({
    firstname: body.firstname,
    lastname: body.lastname,
    mail: body.mail,
    subject: body.subject,
    ticketCreateDate: new Date()
  });
  doc.save();

  return doc;
};



export { createTicket };
