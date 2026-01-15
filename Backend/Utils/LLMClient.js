let { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.Gemini_API});


let LLMClient=async({text,language,format})=>{
    
    let prompt=`
    Summarize the following text.
  Text:${text},
  Format:${format},
  language:${language}
    `
    let response=await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt
    })
    const summary = response.candidates?.[0]?.content || "No summary generated";

return summary;
}
module.exports=LLMClient