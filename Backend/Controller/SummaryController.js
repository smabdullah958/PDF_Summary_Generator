let SummaryController=async(req,res)=>{
    try{
        let {Language,Format}=req.body;
        console.log(Language,Format);

        //validation
        if(!Language || !Format){
            return res.status(400).json({Error:"Language and Format are required"});
        }
        if(!req.file){
            return res.status(400).json({Error:"PDF file is required"});
        }
        console.log("and the language is", Language,"and we need a format",Format);
        res.status(200).json({Message:"Data received successfully"});
    }
    catch(err){
        res.status(500).json({Error:"Internal Server Error"});
    }
}

module.exports=SummaryController;