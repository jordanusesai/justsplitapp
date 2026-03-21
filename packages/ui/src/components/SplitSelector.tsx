import React, { useState } from 'react';
import { clsx } from 'clsx';

export type SplitType = 'equal' | 'exact' | 'percentage' | 'shares';

export interface ParticipantSplit {
  userId: string;
  name: string;
  amount: number;
  percentage?: number;
  shares?: number;
}

export interface SplitSelectorProps {
  totalAmount: number;
  participants: Array<{ id: string; name: string }>;
  onChange: (splits: ParticipantSplit[]) => void;
  className?: string;
}

export const SplitSelector: React.FC<SplitSelectorProps> = ({
  totalAmount,
  participants,
  onChange,
  className,
}) => {
  const [splitType, setSplitType] = useState<SplitType>('equal');
  const [splits, setSplits] = useState<Record<string, number>>({}); // stores value based on splitType

  const handleSplitTypeChange = (type: SplitType) => {
    setSplitType(type);
    // Recalculate or reset splits based on type
    if (type === 'equal') {
      const equalAmount = totalAmount / participants.length;
      const newSplits: Record<string, number> = {};
      participants.forEach(p => newSplits[p.id] = equalAmount);
      setSplits(newSplits);
      onChange(participants.map(p => ({ userId: p.id, name: p.name, amount: equalAmount })));
    }
  };

  const handleValueChange = (userId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newValues = { ...splits, [userId]: numValue };
    setSplits(newValues);

    // Calculate final amounts based on split type
    let finalSplits: ParticipantSplit[] = [];
    if (splitType === 'exact') {
      finalSplits = participants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: newValues[p.id] || 0
      }));
    } else if (splitType === 'percentage') {
      finalSplits = participants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: (totalAmount * (newValues[p.id] || 0)) / 100,
        percentage: newValues[p.id] || 0
      }));
    } else if (splitType === 'shares') {
      const totalShares = Object.values(newValues).reduce((sum, s) => sum + s, 0);
      finalSplits = participants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: totalShares > 0 ? (totalAmount * (newValues[p.id] || 0)) / totalShares : 0,
        shares: newValues[p.id] || 0
      }));
    }
    onChange(finalSplits);
  };

  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex bg-gray-100 p-1 rounded-lg">
        {(['equal', 'exact', 'percentage', 'shares'] as SplitType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleSplitTypeChange(type)}
            className={clsx(
              'flex-1 py-2 text-sm font-medium rounded-md transition-all',
              splitType === type
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
            <span className="font-medium text-gray-900">{participant.name}</span>
            <div className="flex items-center space-x-2">
              {splitType === 'equal' ? (
                <span className="text-gray-600">
                  ${(totalAmount / participants.length).toFixed(2)}
                </span>
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={splits[participant.id] || ''}
                    onChange={(e) => handleValueChange(participant.id, e.target.value)}
                    className="w-20 px-2 py-1 text-right border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0"
                  />
                  <span className="text-gray-500 text-sm">
                    {splitType === 'percentage' ? '%' : splitType === 'shares' ? 'shares' : '$'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {splitType !== 'equal' && (
        <div className="pt-2 text-right">
          <p className={clsx(
            'text-sm font-medium',
            splitType === 'percentage' && Object.values(splits).reduce((a, b) => a + b, 0) !== 100
              ? 'text-red-500'
              : 'text-gray-500'
          )}>
            {splitType === 'percentage' && `Total: ${Object.values(splits).reduce((a, b) => a + b, 0)}% / 100%`}
            {splitType === 'exact' && `Total: $${Object.values(splits).reduce((a, b) => a + b, 0).toFixed(2)} / $${totalAmount.toFixed(2)}`}
          </p>
        </div>
      )}
    </div>
  );
};
