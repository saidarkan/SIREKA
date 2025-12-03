import { useState, useEffect } from "react";
import axios from "axios";


export default function QuoteGuest() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = () => {
    setLoading(true);
    setError(null);

    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        if (res.status !== 200) {
          setError("Failed to fetch quote.");
          setLoading(false);
          return;
        }
        setQuote(res.data.slip.advice);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote(); // fetch saat mount
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 p-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Inspirational Quote</h1>

      {loading && <p className="text-white text-lg italic">Loading...</p>}

      {error && (
        <p className="text-red-200 bg-red-600 px-4 py-2 rounded mb-6">
          {error}
        </p>
      )}

      {!loading && !error && (
        <blockquote className="max-w-xl text-white text-2xl italic font-semibold drop-shadow-lg">
          “{quote}”
        </blockquote>
      )}

      <button
        onClick={fetchQuote}
        className="mt-10 bg-white text-green-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-100 transition"
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get New Quote"}
      </button>
    </div>
  );
}
