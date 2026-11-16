import React, { useState } from 'react';
import { BookMarked, Check, MapPin, X } from 'lucide-react';
import type { CatalogSource } from '../types/academic';

interface StacksLocationModalProps {
  source: CatalogSource | null;
  onClose: () => void;
}

const WINGS = [
  { id: 0, label: 'North Stacks', sub: 'Humanities & Civil', x: 24, y: 20, w: 180, h: 66 },
  { id: 1, label: 'East Periodicals', sub: 'Computing & Serials', x: 224, y: 20, w: 152, h: 120 },
  { id: 2, label: 'South Science', sub: 'Biophysics & Energy', x: 24, y: 156, w: 180, h: 66 },
  { id: 3, label: 'Special Archives', sub: 'Vaults & Rare Folios', x: 224, y: 156, w: 152, h: 66 },
];

export const StacksLocationModal: React.FC<StacksLocationModalProps> = ({ source, onClose }) => {
  const [holdRequested, setHoldRequested] = useState(false);

  if (!source) return null;

  const { stackLocation } = source;
  const activeWing = stackLocation.wingIndex;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1C30]/35 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stacks-modal-title"
    >
      <div className="w-full max-w-[560px] rounded-[16px] bg-white border border-[#E2E8F0] shadow-popover overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-medium text-[#2563EB] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>University Library Stack Locator</span>
            </div>
            <h2
              id="stacks-modal-title"
              className="font-display text-[17px] font-semibold text-[#0B1C30] leading-[24px]"
            >
              {stackLocation.building}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[8px] text-[#64748B] hover:text-[#0B1C30] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Close stack locator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Paper Reference Summary */}
          <div>
            <p className="text-[13px] font-medium text-[#0B1C30] leading-[19px] mb-1">
              {source.title}
            </p>
            <p className="text-[12px] text-[#64748B]">
              {source.authors.join(', ')} · {source.year}
            </p>
          </div>

          {/* Architectural Wing Schematic */}
          <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] p-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B] mb-2">
              <span>{stackLocation.floor}</span>
              <span className="font-mono text-[#102342]">{stackLocation.aisle}</span>
            </div>

            <svg
              viewBox="0 0 400 242"
              className="w-full h-auto"
              role="img"
              aria-label={`Floor plan highlighting ${stackLocation.wing}`}
            >
              <rect x="8" y="8" width="384" height="226" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
              {/* Central Atrium */}
              <rect
                x="96"
                y="98"
                width="108"
                height="46"
                rx="6"
                fill="#F1F5F9"
                stroke="#CBD5E1"
                strokeDasharray="4 3"
              />
              <text
                x="150"
                y="125"
                textAnchor="middle"
                fill="#64748B"
                fontSize="10"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
              >
                Reading Atrium
              </text>

              {WINGS.map((wing) => {
                const isTarget = wing.id === activeWing;
                return (
                  <g key={wing.id}>
                    <rect
                      x={wing.x}
                      y={wing.y}
                      width={wing.w}
                      height={wing.h}
                      rx="8"
                      fill={isTarget ? '#EFF4FF' : '#F8FAFC'}
                      stroke={isTarget ? '#2563EB' : '#E2E8F0'}
                      strokeWidth={isTarget ? '2' : '1'}
                    />
                    <text
                      x={wing.x + 12}
                      y={wing.y + 26}
                      fill={isTarget ? '#102342' : '#44474E'}
                      fontSize="12"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="600"
                    >
                      {wing.label}
                    </text>
                    <text
                      x={wing.x + 12}
                      y={wing.y + 44}
                      fill={isTarget ? '#2563EB' : '#64748B'}
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                    >
                      {isTarget ? `${stackLocation.aisle} · Target` : wing.sub}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Call Number & Shelf Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-[11px] font-medium text-[#64748B] mb-0.5">Call Number</div>
              <div className="font-mono text-[13px] font-medium text-[#0B1C30]">
                {source.callNumber}
              </div>
            </div>
            <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-[11px] font-medium text-[#64748B] mb-0.5">Shelf Range</div>
              <div className="font-mono text-[13px] font-medium text-[#0B1C30]">
                {stackLocation.shelfCode}
              </div>
            </div>
          </div>

          {/* Availability & Hold Request */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E2E8F0]">
            <div className="text-[12px]">
              <span className="text-[#64748B]">Status: </span>
              <span className="font-semibold text-[#0D9488]">{stackLocation.availability}</span>
            </div>

            <button
              type="button"
              onClick={() => setHoldRequested((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                holdRequested
                  ? 'bg-[#0D9488] text-white'
                  : 'bg-[#102342] hover:bg-[#1E3A5F] text-white'
              }`}
            >
              {holdRequested ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Reserved for Reading Room</span>
                </>
              ) : (
                <>
                  <BookMarked className="w-4 h-4" />
                  <span>Request Reading Room Hold</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
