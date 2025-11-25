import React, { useState, useEffect } from 'react';
import { Quest, QuestStatus, QuestType } from '../types';
import { Check, Loader2, ExternalLink, Wallet, MessageSquare, DollarSign, FileSignature, AlertCircle } from 'lucide-react';
import { useQuestVerification, useQuestTransaction } from '../hooks/useQuestVerification';

interface QuestItemProps {
  quest: Quest;
  onVerify: (id: number) => void;
  disabled: boolean;
}

export const QuestItem: React.FC<QuestItemProps> = ({ quest, onVerify, disabled }) => {
  const { verifyQuest, verifyingQuestId } = useQuestVerification();
  const [txHash, setTxHash] = useState<string | undefined>();
  const [localStatus, setLocalStatus] = useState(quest.status);
  const [error, setError] = useState<string | null>(null);
  
  const { isPending, isConfirmed, isFailed } = useQuestTransaction(txHash);
  
  const isVerifying = verifyingQuestId === quest.id || isPending;

  // Update local status when transaction confirms
  useEffect(() => {
    if (isConfirmed && txHash) {
      setLocalStatus(QuestStatus.COMPLETED);
      onVerify(quest.id);
      setTxHash(undefined);
    }
    if (isFailed) {
      setLocalStatus(QuestStatus.FAILED);
      setError('Transaction failed');
      setTxHash(undefined);
    }
  }, [isConfirmed, isFailed, txHash, quest.id, onVerify]);

  // Get icon based on quest type
  const getQuestIcon = () => {
    switch (quest.type) {
      case QuestType.ONCHAIN:
        return <Wallet className="w-5 h-5" />;
      case QuestType.SOCIAL:
        return <MessageSquare className="w-5 h-5" />;
      case QuestType.BALANCE:
        return <DollarSign className="w-5 h-5" />;
      case QuestType.SIGNATURE:
        return <FileSignature className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  // Handle quest action button click
  const handleAction = async () => {
    if (disabled || localStatus === QuestStatus.COMPLETED) return;
    
    setError(null);

    // If quest has redirectUrl, open it first
    if (quest.redirectUrl) {
      window.open(quest.redirectUrl, '_blank');
      // For external actions, don't auto-verify - wait for user to click verify
      return;
    }

    // Otherwise, immediately verify (for balance, signature, mint)
    await handleVerify();
  };

  // Handle verification
  const handleVerify = async () => {
    if (disabled || localStatus === QuestStatus.COMPLETED) return;
    
    setError(null);
    setLocalStatus(QuestStatus.VERIFYING);

    const result = await verifyQuest(quest);
    
    if (result.success) {
      if (result.txHash) {
        // Wait for transaction confirmation
        setTxHash(result.txHash);
      } else {
        // Social quests complete immediately (no tx)
        setLocalStatus(QuestStatus.COMPLETED);
        onVerify(quest.id);
      }
    } else {
      setLocalStatus(QuestStatus.FAILED);
      setError(result.error || 'Verification failed');
      
      // Reset to pending after 3 seconds
      setTimeout(() => {
        setLocalStatus(QuestStatus.PENDING);
        setError(null);
      }, 3000);
    }
  };

  // Determine button state and text
  const getButtonContent = () => {
    if (localStatus === QuestStatus.COMPLETED) {
      return (
        <>
          <Check className="w-4 h-4" />
          Completed
        </>
      );
    }

    if (isVerifying) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {isPending ? 'Confirming...' : 'Verifying...'}
        </>
      );
    }

    if (localStatus === QuestStatus.FAILED) {
      return (
        <>
          <AlertCircle className="w-4 h-4" />
          Failed
        </>
      );
    }

    // If has redirect URL and hasn't been clicked yet, show "Start"
    if (quest.redirectUrl && localStatus === QuestStatus.PENDING) {
      return (
        <>
          <ExternalLink className="w-4 h-4" />
          Start Quest
        </>
      );
    }

    return 'Verify';
  };

  const getButtonClass = () => {
    const base = 'px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2';
    
    if (localStatus === QuestStatus.COMPLETED) {
      return `${base} bg-green-600/20 text-green-400 cursor-not-allowed`;
    }
    
    if (localStatus === QuestStatus.FAILED) {
      return `${base} bg-red-600/20 text-red-400`;
    }
    
    if (disabled || isVerifying) {
      return `${base} bg-slate-700 text-slate-400 cursor-not-allowed`;
    }
    
    return `${base} bg-blue-600 hover:bg-blue-500 text-white`;
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
              {getQuestIcon()}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{quest.title}</h3>
              <p className="text-sm text-slate-400">{quest.type}</p>
            </div>
          </div>
          
          <p className="text-slate-300 mb-4">{quest.description}</p>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-400 font-medium">
              +{quest.xpReward} XP
            </span>
            {error && (
              <span className="text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {quest.redirectUrl && localStatus !== QuestStatus.COMPLETED ? (
            <>
              <button
                onClick={handleAction}
                disabled={disabled || isVerifying}
                className={getButtonClass()}
              >
                {getButtonContent()}
              </button>
              {localStatus === QuestStatus.PENDING && (
                <button
                  onClick={handleVerify}
                  disabled={disabled || isVerifying}
                  className="px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm"
                >
                  I completed this
                </button>
              )}
            </>
          ) : (
            <button
              onClick={quest.redirectUrl ? handleVerify : handleAction}
              disabled={disabled || isVerifying || localStatus === QuestStatus.COMPLETED}
              className={getButtonClass()}
            >
              {getButtonContent()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
