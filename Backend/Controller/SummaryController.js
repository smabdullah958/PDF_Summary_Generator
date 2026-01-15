
let PDFTextExtractor=require("../Utils/TextExtractor")

let SummaryController=async(req,res)=>{
    try{
        let {Language,Format}=req.body;
        console.log(Language,Format,req.file);

        //validation
        if(!Language || !Format){
            return res.status(400).json({Error:"Language and Format are required"});
        }
        if(!req.file){
            return res.status(400).json({Error:"PDF file is required"});
        }

        // pdf text extractor
      let result=await  PDFTextExtractor(req.file.buffer)
        
        console.log("the file daa is ", result.text);
        res.status(200).json({Message:"Data received successfully"});
    }
    catch(err){
        console.log("internal eror",err)
        res.status(500).json({Error:"Internal Server Error"});
    }
}

module.exports=SummaryController;