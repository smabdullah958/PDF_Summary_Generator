let { GoogleGenAI } = require("@google/genai");

let apiKeys=[
  process.env.Gemini_API_1,
  process.env.Gemini_API_2,
  process.env.Gemini_API_3
].filter(Boolean)

let LLMClient=async({text,language,format})=>{
 
      const prompt = `
TASK:
Summarize the given text.

STRICT RULES (NO EXCEPTIONS):
1. Output langua  ge MUST be ${language}.
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

let lastError

  for (let key of apiKeys) {
    try {
         const ai = new GoogleGenAI({ apiKey: key });
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
    } catch (err) {
      lastError = err;
      console.warn(`API key failed: ${key}, trying next...`);
      continue; // try the next key
    }
  }
return "Please try  again after some time"
}

module.exports=LLMClient