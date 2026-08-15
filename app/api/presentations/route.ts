import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set. Add it to .env.local to generate decks." },
      { status: 500 }
    );
  }

  const { topic, slideCount = 6 }: { topic: string; slideCount?: number } = await req.json();
  if (!topic?.trim()) {
    return Response.json({ error: "Provide a topic or pasted notes." }, { status: 400 });
  }

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'Return ONLY valid JSON: {"title": string, "slides": [{"heading": string, "bullets": string[]}]}. No prose outside the JSON.',
        },
        {
          role: "user",
          content: `Create a ${slideCount}-slide presentation outline on: ${topic}`,
        },
      ],
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return Response.json({ error: `OpenAI error: ${text || upstream.statusText}` }, { status: 502 });
  }

  const data = await upstream.json();
  const content = data.choices?.[0]?.message?.content || "{}";

  try {
    const parsed = JSON.parse(content);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Model returned malformed JSON — try again." }, { status: 502 });
  }
}
