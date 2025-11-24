# QuestQuest

QuestQuest is a fun and interactive dApp built on Base where users can complete **daily quests**, earn **NFT rewards**, and share their achievements on **Farcaster**. The app is designed to be immersive, beginner-friendly, and fully integrated with on-chain interactions.

---

## **Architecture**

### **1️⃣ Smart Contracts**

- **`AchievementsNFT.sol`**
  - ERC721 NFT contract
  - Mints NFT rewards when users complete quests
  - Tracks NFT ownership and metadata
  - Deployed Address: `0xa1258e6b9afF4b1d90B7BEa912ce81E07114f76e`

- **`QuestQuest.sol`**
  - Manages daily quests
  - Stores quest data: name, description, reward ID, day index
  - Tracks which quests each user has completed
  - Interacts with `AchievementsNFT.sol` to mint rewards
  - Deployed Address: `0x93B9E86c8cec411D9Fb62dfc9b448A6623Fb5F83`

- **`Deploy.s.sol`** (Script)
  - Foundry deploy script for both contracts
  - Handles correct deployment order and constructor arguments

---

### **2️⃣ Frontend**

- **Framework:** Next.js + TypeScript + Tailwind CSS  
- **Pages**
  - `app/page.tsx` – main interface showing quests, complete buttons, claim rewards, and share buttons
- **Components**
  - `QuestCard` – displays individual quest with details
  - `ClaimReward` – button to trigger reward claiming
  - `ShareAchievement` – enables sharing achievements to Farcaster
- **Lib**
  - `contract.ts` – stores deployed contract addresses and ABIs
  - `wagmi.ts` – wallet connection and hooks
  - `farcaster.ts` – helper functions for Farcaster MiniKit integration
- **Public Assets**
  - Icons, images, and `public/.well-known/farcaster.json` for Farcaster integration

---

### **3️⃣ Folder Structure**

QuestQuest/
├─ app/
│ ├─ page.tsx
│ ├─ layout.tsx
│ ├─ globals.css
│ └─ favicon.ico
├─ app/components/
│ ├─ QuestCard.tsx
│ ├─ ClaimReward.tsx
│ └─ ShareAchievement.tsx
├─ app/lib/
│ ├─ contract.ts
│ ├─ wagmi.ts
│ └─ farcaster.ts
├─ contracts/
│ ├─ AchievementsNFT.sol
│ ├─ QuestQuest.sol
│ └─ script/Deploy.s.sol
├─ public/
│ ├─ file.svg
│ ├─ globe.svg
│ ├─ next.svg
│ ├─ vercel.svg
│ ├─ window.svg
│ └─ .well-known/farcaster.json
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ postcss.config.mjs
├─ eslint.config.mjs
├─ README.md
└─ .gitignore


---

### **4️⃣ Deployment**

- **Contracts:**  
  Deployed on Base mainnet. Addresses are in `app/lib/contract.ts`.  

- **Frontend:**  
  Can be deployed to **Vercel**. Continuous deployment is possible via GitHub integration.

- **Farcaster Integration:**  
  - `public/.well-known/farcaster.json` contains MiniKit metadata  
  - Enables sharing completed quests to Farcaster feeds

---

### **5️⃣ Usage**

1. Connect your wallet (MetaMask or compatible Base wallet)  
2. View today’s quests on the main page  
3. Click **Complete** to finish a quest  
4. NFT rewards are automatically minted to your wallet  
5. Share achievements to Farcaster using the **Share** button

---

### **6️⃣ Tech Stack**

- **Blockchain:** Base (Ethereum Layer 2)  
- **Smart Contracts:** Solidity (ERC721 + custom Quest logic)  
- **Frontend:** Next.js + TypeScript + Tailwind CSS  
- **Wallet:** Wagmi + RainbowKit (optional)  
- **Hosting:** Vercel  
- **Sharing:** Farcaster MiniKit  

---

### **7️⃣ Future Enhancements**

- Automatic daily quest rotation  
- Dynamic quest generation and difficulty scaling  
- Leaderboards and social sharing improvements  
- On-chain analytics for completed quests and minted NFTs
