import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateWorkPlan(prompt: any) {
  const parameters = {
    model: "davinci:ft-personal-2023-07-16-19-34-46",
    prompt,
    max_tokens: 150,
    temperature: 0.65,
    n: 1,
    stop: " ###",
  };

  const response = await openai.createCompletion(parameters);

  return response.data.choices[0].text;
}
