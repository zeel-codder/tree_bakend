
// name: String,
// current_sales_value : String,
// target_sales_value: String,
// level: Number,
// child:[String],
// progress:Number,
// progress_label:String,
// bar_color:String


const getData =  (current, total) =>{

    const progress=(current/total)*100;


    let bar_color='',progress_label='';

    if(progress<=33){
        bar_color='red';
        progress_label='At risk';

    }else if(progress>33 && progress<=66){
        bar_color='yellow';
        progress_label='off track';
    }else{
        bar_color='green';
        progress_label='on track';
    }

    return {progress,bar_color,progress_label};


}


exports.getData=getData;