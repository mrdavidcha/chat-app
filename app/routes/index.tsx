import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { getOpenAI } from "../models/chat.server";

type ChatGPTData = {
  res: Awaited<ReturnType<typeof getOpenAI>>;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const question:any = formData.get('question');
  console.log('question ---> ', question);

  const res = await getOpenAI(question);

  return json<ChatGPTData>({ res });
}

export default function Index() {
  const data = useActionData();

  console.log('res ????', data?.res);

  return (
    <div className="sm">
      <div className="max-w-screen-md flex flex-wrap flex-col p-6 place-content-end">
        <div className="grow">
          <h1 className="text-6xl font-bold text-stone-600">Ask me anything:</h1>
        </div>
        <div className="grow pt-3">
          <Form method="post">
            <input
              type="text"
              autoComplete={"false"}
              id="question"
              name="question"
              className="border text-gray-500 text-lg focus:ring-blue-500 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What would you like to know?"
              required
            />
            <button type="submit"  className="border p-1.5 text-lg text-gray-500 mt-3 hover:text-gray-800">Submit</button>
          </Form>

          <span>{data?.res}</span>
        </div>
      </div>
    </div>
  );
}
