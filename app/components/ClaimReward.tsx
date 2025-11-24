"use client";
import React from "react";

export default function ClaimReward({ onClaim }) {
  return (
    <button
      className="px-5 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
      onClick={onClaim}
    >
      Claim Reward NFT
    </button>
  );
}
