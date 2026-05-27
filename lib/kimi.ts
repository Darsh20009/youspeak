import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.moonshot.ai/v1',
});

export async function askKimi(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  options?: { temperature?: number; max_tokens?: number }
): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'kimi-k2-0905-preview',
    messages,
    temperature: options?.temperature ?? 0.3,
    max_tokens: options?.max_tokens ?? 2048,
  });
  return response.choices[0]?.message?.content ?? '';
}

export default client;
