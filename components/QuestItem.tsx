import React from 'react';
import { CheckCircle2, Circle, Loader2, ArrowRight, ShieldCheck, PenTool, Wallet, Globe } from 'lucide-react';
import { Quest, QuestStatus, QuestType } from '../types';

interface QuestItemProps {
  quest: Quest;
  onVerify: (id: number) => void;
  disabled: boolean;
}

const getIcon = (type: QuestType) => {
  switch (type) {
    case QuestType.SIGNATURE: return <PenTool className="w-5 h-5 text-purple-400" />;
    case QuestType.ONCHAIN_TX: return <ShieldCheck className="w-5 h-5 text-blue-400" />;
    case QuestType.BALANCE: return <Wallet className="w-5 h-5 text-green-400" />;
    case QuestType.SOCIAL: return <Globe className="w-5 h-5 text-pink-400" />;
    default: return <Circle className="w-5 h-5" />;
  }
};

export const QuestItem: React.FC<QuestItemProps> = ({ quest, onVerify, disabled }) => {
  const isCompleted = quest.status === QuestStatus.COMPLETED;
  const isVerifying = quest.status === QuestStatus.VERIFYING;

  return (
    <div className={`
      relative overflow-hidden rounded-xl border p-4 transition-all duration-300
      ${isCompleted 
        ? 'bg-slate-900/50 border-green-500/30 shadow-[0_0_15px_-5px_rgba(34,197,94,0.3)]' 
        : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'}
    `}>
      <div className="flex items-start justify-between gap-4">
        {/* Icon Box */}
        <div className={`p-3 rounded-lg ${isCompleted ? 'bg-green-500/10' : 'bg-slate-800'}`}>
          {isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : getIcon(quest.type)}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-semibold ${isCompleted ? 'text-slate-300 line-through decoration-slate-600' : 'text-white'}`}>
              {quest.title}
            </h3>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
              +{quest.xp} XP
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            {quest.description}
          </p>
        </div>
      </div>

      {/* Action Area */}
      <div className="mt-4 flex justify-end">
        {isCompleted ? (
          <div className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full">
            Completed
          </div>
        ) : (
          <button
            onClick={() => onVerify(quest.id)}
            disabled={disabled || isVerifying}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isVerifying 
                ? 'bg-slate-700 text-slate-300 cursor-wait' 
                : 'bg-slate-100 text-slate-900 hover:bg-white active:scale-95'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                {quest.actionLabel}
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};