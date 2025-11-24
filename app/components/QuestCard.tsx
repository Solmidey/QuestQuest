"use client";
import React from "react";

export default function QuestCard({ quest, onComplete, isLoading }: { 
  quest: any; 
  onComplete: (id: number) => void;
  isLoading?: boolean;
}) {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl my-2 border-l-4 border-blue-500">
      <h3 className="text-xl font-bold">{quest.name}</h3>
      <p className="text-gray-600">{quest.description}</p>
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        onClick={() => onComplete(quest.id)}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Complete Quest"}
      </button>
    </div>
  );
}
