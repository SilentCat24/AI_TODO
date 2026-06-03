const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function generateSuggestions(task) {
  try {
    const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: `The user has a task: "${task}"

It's now time for them to do this task. Give them 4-6 short, practical suggestions or reminders to help them complete it successfully.
Respond ONLY with a JSON array of short suggestion strings.
Example:
["Bring a water bottle", "Wear comfortable shoes"]`,
        },
      ],
      temperature: 0.7,
    });

    // FULL RESPONSE
    console.log("FULL RESPONSE:");
    console.log(JSON.stringify(response, null, 2));

    const raw = response.choices[0].message.content.trim();

    // AI GENERATED TEXT
    console.log("RAW AI OUTPUT:");
    console.log(raw);

    const suggestions = JSON.parse(raw);

    console.log("PARSED SUGGESTIONS:");
    console.log(suggestions);

    return suggestions;
  } catch (error) {
    console.error("AI Error:", error.message);

    return [
      "Stay focused",
      "Prepare before starting",
      "Take small steps",
    ];
  }
}

module.exports = { generateSuggestions };