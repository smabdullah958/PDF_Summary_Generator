import { PDFParse } from 'pdf-parse';

export async function extractTextFromPDF(file){
    
    //convert file to a buffer array;
    let arrraybuffer=await file.arrayBuffer();
    let buffer=Buffer.from(arrraybuffer);

    //extract text from a pdf
    try{
        let data= await PDFParse(buffer);
        console.log("Extracted text data ",data.text);
        return  data.text;
    }
    catch(error){
        console.log("Error while extracting text from pdf ",error);
    }

}