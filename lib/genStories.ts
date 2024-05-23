import OpenAI from "openai";
import { TextContentBlock } from "openai/resources/beta/threads/messages";
import { text } from "stream/consumers";

const openaikey = process.env.OPENAI_API_KEY;
console.log(`open ai key: ${openaikey}`);
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true,
});

export async function generateStory(prompt: string) {
  console.log("before completion");
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4-turbo:asst_tHCZksvgsFoDfIVDynXNs1UC",
  });

  console.log("after completion");
  console.log(completion.choices[0]);
  return completion.choices[0].message.content as string;
}

export async function generateStoryAssistant(prompt: string) {
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: prompt,
  });

  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: "asst_tHCZksvgsFoDfIVDynXNs1UC",
    // instructions:
    //   "Please address the user as Jane Doe. The user has a premium account.",
  });
  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);

    const response = (
      messages.data[messages.data.length - 2].content[0] as TextContentBlock
    ).text.value as string;
    response.split(".", 2);

    let body = response.substring(response.indexOf(".") + 1);
    let title = response.substring(0, response.indexOf("."));
    console.log(`body: ${body}`);
    console.log(`title: ${title}`);
    return { body, title };
  }
  return { body: "", title: "" };
}
