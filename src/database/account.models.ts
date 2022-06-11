import mongoose from "mongoose";

export interface textDocument extends mongoose.Document {
  username: string;
  mail: string;
  password: string;
}

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const accountModel = mongoose.model<textDocument>("Account", accountSchema);

export default accountModel;

//Create User
const createUser = async (username: string, mail: string, password: string) => {
  const account = await accountModel.findOne({ mail: mail });
  if (account !== null) return true;

  const doc = new accountModel({
    username: username,
    mail: mail,
    password: password,
  });
  doc.save();

  return doc;
};

// Get User
const getUser = async (mail: string) => {
  const account = await accountModel.findOne({ mail: mail });
  return account;
};

// Check User
const checkUser = async (mail: string) => {
  const account = await accountModel.findOne({
    mail: mail,
  });
  return account;
};

export { createUser, getUser, checkUser };
