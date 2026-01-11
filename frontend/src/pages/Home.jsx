import { useState } from "react";
import ReactMarkdown from "react-markdown";
const Home = ({ isDark }) => {
  const [code, setCode] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRoast = async () => {
    setLoading(true);
    setRoast("");
    try {
      const response = await fetch("http://localhost:5000/roast", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();
      setRoast(data);
    } catch (error) {
      setRoast("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="my-5">
        <h1
          className={`text-2xl font-bold mb-4 text-center ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          CodeRoaster AI 🔥
        </h1>
        <p
          className={`mb-4 text-center ${
            isDark ? "text-gray-300" : "text-black"
          }`}
        >
          Paste your bad code below and let the AI judge you.
        </p>
        <div className="flex flex-col gap-4 items-center justify-center w-full px-4">
          <textarea
            className={`border-2 border-gray-300 rounded p-2 h-64 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-sky-500 
              ${
                isDark
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-black"
              }`}
            placeholder="Paste your spaghetti code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <button
            className="bg-sky-300 hover:bg-sky-700 hover:text-white rounded py-2 px-2 font-bold text-xl cursor-pointer transition-colors"
            onClick={handleRoast}
            disabled={loading || !code.trim()}
          >
            {loading ? "Roasting..." : "Roast My Code"}
          </button>
          {roast && (
            <div className="mt-6 p-4 w-full max-w-lg bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/30 dark:border-red-800">
              <h2
                className={`text-xl font-bold mb-2 ${
                  isDark ? "text-violet-300" : "text-violet-900"
                }`}
              >
                🔥 The Verdict:
              </h2>
              <div
                className={`whitespace-pre-wrap leading-relaxed font-medium [&>*]:text-current ${
                  isDark ? "text-gray-100" : "text-black"
                }`}
              >
                <ReactMarkdown>{roast}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
