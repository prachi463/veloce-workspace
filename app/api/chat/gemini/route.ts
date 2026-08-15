import { NextRequest } from "next/server";

export const runtime = "edge";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY is not set. Add it to .env.local to enable this model." },
      { status: 500 }
    );
  }

  const { messages }: { messages: ChatMessage[] } = await req.json();

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [
            {
              text: "You are the Veloce Workspace study assistant with multimodal analysis ability — good for parsing diagrams, images, and documents students attach.",
            },
          ],
        },
      }),
    }
  );

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return Response.json({ error: `Gemini error: ${text || upstream.statusText}` }, { status: 502 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.replace("data:", "").trim();
          if (!payload) continue;
          try {
            const json = JSON.parse(payload);
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // ignore malformed keep-alive chunks
          }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}