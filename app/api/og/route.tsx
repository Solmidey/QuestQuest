import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 80 }}>⚔️</span>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginLeft: 20,
            }}
          >
            QuestQuest
          </h1>
        </div>
        <p
          style={{
            fontSize: 32,
            color: '#94a3b8',
            marginBottom: 40,
          }}
        >
          Complete Daily Quests • Earn NFT Rewards
        </p>
        <div
          style={{
            display: 'flex',
            gap: 30,
            fontSize: 24,
            color: '#60a5fa',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🎯</span>
            <span>10 Daily Quests</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🏆</span>
            <span>XP & Badges</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>⛓️</span>
            <span>Base Network</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
