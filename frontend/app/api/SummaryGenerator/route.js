import {extractTextFromPDF} from "@/app/Utils/TextExtractor";
export async function POST(request){
    //read or access data like file etc
    let formData=await request.formData();
    let File=formData.get("pdf");
    let Language=formData.get("Language");
    let Format=formData.get("Format");
    if(!File){
        return Response.json({message:"No file uploaded"}, {status:400});
    }
    //call text extractor function
    await extractTextFromPDF(File);

    console.log("File recieved ",File," with a language ",Language," and format ",Format);
    return Response.json({message:"File recieved successfully"});
}