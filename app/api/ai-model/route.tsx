import Constants from "@/data/Constants";
import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export const POST = async (request: NextRequest) => {
  try {
    const { aiModel, description, imgUrl } = await request.json();
    const AiModelObject = Constants?.AIModelsList.find((item) => item.value === aiModel);
    const AiModelName = AiModelObject?.modelName ?? "google/gemini-2.0-pro-exp-02-05:free";

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stream: true,
        model: AiModelName,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: description },
              { type: "image_url", image_url: { url: imgUrl } },
            ],
          },
        ],
      }),
    });

    // Assign response.body to a constant so TS knows it's non-null after checking
    const responseBody = response.body;
    if (!responseBody) {
      return NextResponse.json({ error: "No response from OpenRouter" }, { status: 500 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = responseBody.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const decodedChunk = decoder.decode(value, { stream: true });
          const lines = decodedChunk.split("\n").map((line) => line.trim()).filter(Boolean);

          for (const line of lines) {
            // Skip any extraneous lines
            if (line.includes("OPENROUTER PROCESSING")) continue;

            if (line.startsWith("data:")) {
              const jsonString = line.replace(/^data:\s*/, "");
              if (jsonString === "[DONE]") continue;
              try {
                const parsed = JSON.parse(jsonString);
                const chunkContent = parsed?.choices?.[0]?.delta?.content;
                if (chunkContent) {
                  controller.enqueue(new TextEncoder().encode(chunkContent));
                }
              } catch (e) {
                console.error("Error parsing JSON chunk:", e);
              }
            }
          }
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
    
  } catch (error) {
    console.error("Error calling OpenRouter AI:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
