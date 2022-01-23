



const Hello = async (req, res) =>{

    try {
 
        res.status(200).send('hello');
    }
    catch(e){

        res.status(404).send("Error");

    }
}


exports.Hello=Hello;