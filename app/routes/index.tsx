export default function Index() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-wrap items-center">
        <h1 className="text-7xl font-bold text-stone-600">Ask me anything:</h1>
        </div>
        <div className="flex flex-wrap items-center">
          <input type="text" id="Question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type question here" required/>
        </div>
      </div>
    </>
  );
}
