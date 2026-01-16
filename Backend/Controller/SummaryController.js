
let PDFTextExtractor=require("../Utils/TextExtractor")
let LLMClient=require("../Utils/LLMClient");

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
      let result=await  PDFTextExtractor(req.file.buffer);
      if(!result.text){
        return res.status(400).json({error:"empty pdf"});
      }
     let Summary = await LLMClient({
       text:result.text,
       language:Language,
       format:Format 
    }); 
    

        console.log("the file daa is ", result.text);
        console.log("the summary of a file isa ",Summary) 
        res.status(200).json({Message:"Data received successfully",Summary});
    }
    catch(err){
        console.log("internal eror",err)
        if(err?.status===429){
            return res.status(429).json({error:"AI has high load. Please try  again after 24 hour"})
        }
        res.status(500).json({Error:"Please try  again after some time"});
    }
}

module.exports=SummaryController;