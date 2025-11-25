'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export function FarcasterLogin({ onLogin }: { onLogin: (fid: number, username: string) => void }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const ctx = await sdk.context;
      setContext(ctx);
      setIsSDKLoaded(true);
      
      if (ctx?.user) {
        onLogin(ctx.user.fid, ctx.user.username || 'Anon');
      }
    };
    load();
  }, [onLogin]);

  if (!isSDKLoaded) {
    return <div className="text-slate-400">Loading Farcaster...</div>;
  }

  return context?.user ? (
    <div className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg">
      <span className="text-white">@{context.user.username || context.user.fid}</span>
    </div>
  ) : null;
}
