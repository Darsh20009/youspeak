import OpenAI from 'openai';

function getClient() {
  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) throw new Error('MOONSHOT_API_KEY is not set');
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.moonshot.ai/v1',
  });
}

export async function askKimi(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  options?: { temperature?: number; max_tokens?: number }
): Promise<string> {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: 'kimi-k2-0905-preview',
    messages,
    temperature: options?.temperature ?? 0.3,
    max_tokens: options?.max_tokens ?? 2048,
  });
  return response.choices[0]?.message?.content ?? '';
}
