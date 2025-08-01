// src/utils/api.ts

export async function getAIBotReply(userText: string, detectedEmotion: string): Promise<string> {
  const systemPrompt = `
You are "Mood Spoiler Bot", a sarcastic and witty chatbot who always replies with the opposite mood of the user's current emotion.

1. Carefully analyze the user's spoken message and the detected facial emotion.
2. If the user's words and detected emotion do not match (e.g., user says they're happy but looks sad), cleverly and humorously point out or tease this discrepancy.
3. Always reply with the opposite mood of the user's detected emotion.
4. Your replies should be playful, sarcastic, and entertaining.
5. Do NOT repeat the user's message or emotion. Respond only as the chatbot.

User spoken message: "${userText}"
Detected facial emotion: "${detectedEmotion}"
`.trim();

const messages = [
  { role: "system", content: systemPrompt },
  { role: "user", content: userText },
];

  try {
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HF_TOKEN}`,  // Make sure your .env has VITE_HF_TOKEN
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "zai-org/GLM-4.5:novita", // or your preferred chat model
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error ${response.status}: ${errorText}`);
      return "Sorry, the mood AI is having trouble right now.";
    }

    const data = await response.json();
    // The reply is in data.choices[0].message.content per Hugging Face chat API
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return "Couldn't get bot response!";
    }

    // Remove any <think> tags and trim whitespace
    return reply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

  } catch (error) {
    console.error('Error fetching AI reply:', error);
    return "Couldn't get bot response!";
  }
}
