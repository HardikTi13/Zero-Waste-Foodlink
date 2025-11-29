const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // Note: The Node.js SDK might not have a direct listModels method on the client instance 
        // depending on the version, but usually it's on the GoogleAIFileManager or similar, 
        // or we can just try to generate content with a few common names to see which one works.
        // However, for the purpose of this script, let's try to use the model the user asked for 
        // and see if it works, and also try a known fallback.

        const modelsToTry = [
            "gemini-2.5-flash",
            "gemini-2.0-flash-exp",
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-pro",
            "gemini-pro"
        ];

        console.log("Testing models...");

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`SUCCESS: Model '${modelName}' is available.`);
                return; // Found a working one
            } catch (error) {
                console.log(`FAILURE: Model '${modelName}' failed: ${error.message}`);
            }
        }

        console.log("No working models found from the list.");

    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
