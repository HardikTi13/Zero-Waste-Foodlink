const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeImage = async (imagePath) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageBuffer = fs.readFileSync(imagePath);
    const imagePart = {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/jpeg',
      },
    };

    const prompt = `Analyze this food image for a donation platform. Provide a JSON response with the following fields:
    - foodName: string (name of the food)
    - estimatedQuantity: string (e.g., "5 kg", "10 servings")
    - description: string (brief description)
    - freshnessScore: number (1-10, where 10 is very fresh)
    - estimatedHoursToExpire: number (estimated hours until the food is no longer safe/good to consume. Be conservative.)
    - confidence: number (0-1, confidence in the analysis)
    
    Return ONLY the JSON.`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown if present
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Gemini Analysis Error:', error);
    // Return fallback/low confidence result
    return {
      foodName: 'Unknown Food',
      estimatedQuantity: 'Unknown',
      description: 'Could not analyze image.',
      freshnessScore: 5,
      estimatedHoursToExpire: 24, // Default fallback
      confidence: 0
    };
  }
};

module.exports = { analyzeImage };