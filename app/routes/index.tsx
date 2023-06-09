import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from 'react';
import { useActionData, Form } from "@remix-run/react";
import { getOpenAI } from "../models/chat.server";

type ChatGPTData = {
  res: Awaited<ReturnType<typeof getOpenAI>>;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const question:any = formData.get('question');
  const res = await getOpenAI(question);

  return json<ChatGPTData>({ res });
}

export default function Index() {
  const data = useActionData();
  const [isLightMode, setIsLightMode] = useState(false);

  const handleDarkmodeSelect = () => {
    const htmlElement = document.querySelector(':root');

    if (localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      htmlElement?.classList.toggle('dark');
    } else {
      htmlElement?.classList.add('dark');
    }

    const lightMode = htmlElement?.classList.contains('dark') ?? false;
    setIsLightMode(lightMode);
  }

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="flex flex-row p-6 justify-end">
        <button type="button" className="text-sm p-1 text-stone-400 mt-4 cursor-pointer" onClick={() => handleDarkmodeSelect()}>
          Switch to { isLightMode ? 'Light Mode ☀️' : 'Dark Mode 🌌' }
        </button>
      </div>
      <div className="flex flex-row p-6">
        <div className="p-8 max-w-md">
          <div className="justify-end">
            <h1 className="text-7xl font-bold text-stone-500 text-right">Ask me anything</h1>
          </div>
          <div className="pt-4">
            <Form method="post">
              <input
                type="text"
                autoComplete={"false"}
                id="question"
                name="question"
                className="border bg-white rounded-md text-stone-500 text-lg focus:ring-blue-500 focus:border-slate-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-right"
                placeholder='What would you like to know?'
                required
              />
              <button type="submit" className="border dark:border-transparent dark:text-gray-800 rounded-md p-1.5 text-lg bg-stone-500 text-stone-100 mt-4 hover:bg-stone-300 hover:text-stone-500 float-right">Submit</button>
            </Form>
          </div>
        </div>
        <div className="max-w-screen-md text-xl text-gray-400 p-6 py-9 flex-1">
          {
            data?.res?.map((answer: String) => (
              <p className='pt-2' key={`${answer}`}>
                {answer}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
}
