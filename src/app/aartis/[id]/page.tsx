"use client";

import { useParams } from "next/navigation";
import aartisData from "../../../data/aartis.json";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

export default function AartiDetails() {
  const params = useParams();
  const idd = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [aarti, setAarti] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [fontSize, setFontSize] = useState(16); // Default font size

  useEffect(() => {
    if (idd) {
      const foundAarti = aartisData.find((a) => a.id === parseInt(idd));
      if (foundAarti) {
        setAarti(foundAarti);
      }
      setIsLoading(false);
    }
  }, [idd]);

  const increaseFontSize = () => setFontSize(fontSize + 2);
  const decreaseFontSize = () => setFontSize(fontSize - 2); 
  const resetFontSize = () => setFontSize(18); 

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white text-orange-500">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-orange-500 rounded-full"></div>
      </div>
    );
  }

  if (!aarti) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900">
        <h1 className="text-2xl font-semibold text-gray-700">Aarti not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 bg-orange-500 text-white shadow p-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">|| श्री गणेशाय नम ||</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-orange-600">{aarti.name}</h1>
            <p className="text-gray-500 text-lg">
              Festivals: {aarti.festivals.join(", ")}
            </p>
          </div>

          <div className="relative p-6 bg-white shadow-lg">
            <div className="absolute top-6 md:-right-8 right-0 flex flex-col">
              <button
                onClick={increaseFontSize}
                className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                A+
              </button>
              <button
                onClick={resetFontSize}
                className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                A
              </button>
              <button
                onClick={decreaseFontSize}
                className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                A-
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-gray-800">Aarti</h2>
              <select
                className="bg-white text-gray-800 p-2 rounded shadow-sm transition-transform hover:scale-105 md:right-0 right-4"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {Object.keys(aarti.content).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
              {/* Apply fontSize and line breaks properly */}
              <p
                className="text-lg leading-relaxed"
                style={{
                  fontSize: `${fontSize}px`,
                  whiteSpace: "pre-line", // Ensure line breaks are respected
                }}
              >
                {aarti.content[selectedLanguage]}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
