let { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.Gemini_API_1||Gemini_API_2});


let LLMClient=async({text,language,format})=>{
 
      const prompt = `
TASK:
Summarize the given text.

STRICT RULES (NO EXCEPTIONS):
1. Output language MUST be ${language}.
2. Do not use any other language
3. Output format MUST be ${format}.

FORMAT RULES:
- bullet:
  • Use bullet points only
  • heading  starts with "•"
  • NO paragraphs
- paragraph:
  • paragraph only
  • NO bullets

  IMPORTANT:
- Ignore the input language
- Always respond in ${language}


TEXT TO SUMMARIZE:${text}

FINAL CHECK:
Language = ${language}
Format = ${format}
`;

  const systemPrompt = `
You are a STRICT summarization engine.
You MUST follow instructions exactly.
You are NOT allowed to translate unless explicitly told.
`;


    let response=await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
            systemInstruction:systemPrompt
        }
    })
    let summary="no summary generated"
        if (response?.candidates?.length > 0 &&  response.candidates[0]?.content?.parts?.length > 0) {
         summary = response.candidates?.[0]?.content?.parts[0]?.text || "Please try  again after some time";
    }   
console.log(summary)
return summary;
}
module.exports=LLMClient