const { PDFParse } = require('pdf-parse');

let PDFTextExtractor=async(buffer)=>{
    try{
        const parser = new PDFParse({
                data:buffer
            });
            let result=await parser.getText();
            await parser.destroy();
            return result   
    }
    catch(error){
        console.log("file si not present",error)
    }
}
module.exports=PDFTextExtractor