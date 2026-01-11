import { useState } from "react";
const Home = () => {
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          CodeRoaster AI 🔥
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Paste your bad code below and let the AI judge you.
        </p>
        <div className="flex flex-col gap-4 items-center justify-center w-full px-4">
          <textarea
            className="border-2 border-gray-300 rounded p-2 h-64 w-full max-w-lg"
            placeholder="Paste your spaghetti code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <button
            className="bg-sky-300 hover:bg-sky-700 hover:text-white rounded py-2 px-2 font-bold text-xl cursor-pointer"
            onClick={handleRoast}
            disabled={loading || !code.trim()}
          >
            {loading ? "Roasting..." : "Roast My Code"}
          </button>
          {roast && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
              <h2 className="font-bold mb-2">🔥 The Verdict:</h2>
              <p>{roast}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
