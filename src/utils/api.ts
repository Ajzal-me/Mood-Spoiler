// src/utils/api.ts

export async function getAIBotReply(
  messagesHistory: { role: "user" | "bot"; content: string }[],
  detectedEmotion: string
): Promise<string> {
  const systemPrompt = `
You are "Mood Spoiler Bot", a sarcastic and witty chatbot who always replies with the opposite mood of the user's current emotion.

1. Carefully analyze the user's spoken message and the detected facial emotion.
2. If the user's words and detected emotion do not match (e.g., user says they're happy but looks sad), cleverly and humorously point out or tease this discrepancy.
3. Always reply with the opposite mood of the user's detected emotion.
4. Your replies should be playful, sarcastic, and entertaining.
5. Do NOT repeat the user's message or emotion. Respond only as the chatbot.

The detected facial emotion for the latest user message is: "${detectedEmotion}"
`.trim();

  // Convert your history to the API format
  const messages = [
    { role: "system", content: systemPrompt },
    ...messagesHistory.map(m => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.content
    }))
  ];

  try {
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "zai-org/GLM-4.5:novita",
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error ${response.status}: ${errorText}`);
      return "Sorry, the mood AI is having trouble right now.";
    }

    const data = await response.json();
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
