// src/utils/api.ts

export async function getAIBotReply(userText: string, detectedEmotion: string): Promise<string> {
  const messages = [
    { role: "system", content: "You are a witty chatbot that replies with the opposite mood of the user." },
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
        model: "zai-org/GLM-4.5:novita",  // or change to your preferred HF chat model
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

    return reply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    
  } catch (error) {
    console.error('Error fetching AI reply:', error);
    return "Couldn't get bot response!";
  }
}
