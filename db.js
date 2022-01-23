const mongoose=require('mongoose');

console.log(process.env.mongodb_url)


const ConnectToDataBase=async ()=>{
    // console.log('Start Connections')
     await mongoose.connect(process.env.mongodb_url || '');
      
    //  console.log('Loading Connections');
     mongoose.connection
      .once('open',()=>console.log('connect data base'))
      .on('error',(error)=>console.log(error,123));
}


ConnectToDataBase();



const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: String,
    current_sales_value : String,
    target_sales_value: String,
    level: Number,
    child:[String],
    progress:Number,
    progress_label:String,
    bar_color:String
},{ versionKey: false,timestamps: true });



exports.CategorySchema=CategorySchema;

