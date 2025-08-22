import axios from 'axios';

// Use the correct environment variable for Vite
const apiKey = import.meta.env.VITE_COHERE_API_KEY;

const cohereAPI = axios.create({
  baseURL: 'https://api.cohere.ai/v1/generate', // Cohere generation endpoint
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

// Function to get diet suggestions or any other text generation
export const getDietSuggestions = async (dietType, calories) => {
  const prompt = `Suggest a diet plan based on the following:
  - Diet Type: ${dietType}
  - Calories: ${calories}`;

  try {
    const response = await cohereAPI.post('', {
      prompt: prompt,
      max_tokens: 200, // Adjust the max tokens if needed
      temperature: 0.7, // Controls creativity, change as needed
      top_p: 1.0, // Controls diversity
    });

    return response.data.generations[0].text;
  } catch (error) {
    console.error('Error fetching data from Cohere API', error);
    throw new Error('Failed to fetch diet suggestions');
  }
};
