import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}));

  // Testing data, didn't want to use up all my chatGPT credits 🤣
  // const data = "\n\nAs an AI language model, I do not have personal experience with dancing but here are some suggestions:\n\n1. Take dance classes: This is the most obvious and reliable way to learn to dance. Find a dance school or studio that offers the style you’re interested in, and enroll in beginner classes.\n\n2. Watch videos online: You can find countless tutorials on YouTube, TikTok, or Instagram that can teach you how to dance. You can find many different styles and levels of dance in these videos.\n\n3. Learn from friends or family: If you have friends or family members who are good dancers, you can ask them to teach you a few moves.\n\n4. Attend dance parties or events: This is a great way to experience different styles of dance and interact with other dancers. You can learn a lot by attending these social events.\n\n5. Practice, practice, practice: The more you practice, the better you’ll get. Set aside time each day to practice your moves, and you'll be amazed at your progress."
  // const formatedData = data.split('\n');

export async function getOpenAI(question: string) {
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
      role: 'user',
      content: question
    }]
  });

  const content = res?.data?.choices[0]?.message?.content;
  const sanitizedContent = content?.split('\n').filter(Boolean);

  console.log('sanitizedContent', sanitizedContent);
  return sanitizedContent;
};
