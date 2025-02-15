const mongoose = require("mongoose");

require("dotenv").config();
// console.log(process.env.mongodb_url)

const ConnectToDataBase = async () => {
  // console.log('Start Connections')
  await mongoose.connect(process.env.MONGODB_URL || "");

  //  console.log('Loading Connections');
  mongoose.connection
    .once("open", () => console.log("connect data base"))
    .on("error", (error) => console.log(error, 123));
};

ConnectToDataBase();

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: String,
    current_sales_value: Number,
    target_sales_value: Number,
    level: Number,
    child: [String],
    progress: Number,
    progress_label: String,
    bar_color: String,
    parent: String,
  },
  { versionKey: false, timestamps: true }
);

const CategoryModal = mongoose.model("tree", CategorySchema);

exports.CategorySchema = CategorySchema;
exports.CategoryModal = CategoryModal;
