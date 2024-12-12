"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import aartisData from "../data/aartis.json";
import Footer from "@/components/Footer";

const festivals = [
  "All", "Ganesh Chaturthi", "Diwali", "Navratri", "Holi",
  "Dhanteras", "Janmashtami", "Guru Purnima", "Dussehra",
  "Vaikuntha Ekadashi", "Ram Navami", "Makar Sankranti"
];

const AARTIS_PER_PAGE = 12;

const MainPage = () => {
  const [selectedFestival, setSelectedFestival] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAartis, setFilteredAartis] = useState(aartisData);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredAartis(aartisData);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = aartisData.filter((aarti) =>
      aarti.name.toLowerCase().includes(query)
    );
    setFilteredAartis(filtered);
    setCurrentPage(1);
  };

  const filteredByFestival = selectedFestival === "All"
    ? filteredAartis
    : filteredAartis.filter((aarti) =>
      aarti.festivals.includes(selectedFestival)
    );

  const startIdx = (currentPage - 1) * AARTIS_PER_PAGE;
  const paginatedAartis = filteredByFestival.slice(
    startIdx,
    startIdx + AARTIS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredByFestival.length / AARTIS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-orange-500 text-white shadow p-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href={'/'} className="text-2xl font-bold">|| श्री गणेशाय नम ||</Link>
          <select
            className="bg-white p-2 rounded shadow-sm text-gray-700"
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
          >
            {festivals.map((festival) => (
              <option key={festival} value={festival} className="text-gray-700">
                {festival}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Search Section */}
      <div className="flex flex-col items-center my-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full bg-gray-100 p-2 rounded pl-10 shadow-sm"
            placeholder="Search Aartis"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-900">
        {paginatedAartis.map((aarti) => (
          <Link
            key={aarti.id}
            href={`/aartis/${aarti.id}`}
            className="transition-transform transform hover:scale-105 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer hover:bg-orange-100"
          >
            <div className="text-lg font-semibold text-orange-600">{aarti.name}</div>
            <p className="text-sm text-gray-600">
              Festivals: {aarti.festivals.slice(0, 3).join(", ")}
              {aarti.festivals.length > 3 && '...'}
            </p>

          </Link>
        ))}
      </main>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4 mb-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded bg-orange-500 text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${currentPage === i + 1
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-orange-100"
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className={`px-4 py-2 rounded bg-orange-500 text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
