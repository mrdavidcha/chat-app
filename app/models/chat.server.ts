import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}));

export async function getOpenAI(question: string) {
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
      role: 'user',
      content: question
    }]
  }).then((res) => res?.data?.choices[0]?.message?.content);

  return res;

  // return res.data.choices;

  // const res = await fetch(
  //   'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  // ).then((res) => res.json());

  // return res.results;
}
