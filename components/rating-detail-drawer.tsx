'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RatingBadge } from './rating-badge'
import { RatingsDisclaimer } from './ratings-disclaimer'

interface RatingDetailDrawerProps {
  isOpen: boolean
  onClose: () => void
  assetName: string
  cqScore: number
  aiScore: number
  extRating: string
}

export function RatingDetailDrawer({ isOpen, onClose, assetName, cqScore, aiScore, extRating }: RatingDetailDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[var(--bg-card)] border-l border-[var(--border-color)] z-50 overflow-y-auto shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{assetName}</h2>
              <p className="text-[var(--text-muted)]">Detailed Rating Analysis</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[var(--text-primary)]" />
            </button>
          </div>

          {/* Overall Summary */}
          <div className="bg-[var(--bg-card-inner)] rounded-lg p-5 mb-6 border border-[var(--border-color)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Overall Rating Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">CQ Rating</p>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{cqScore.toFixed(1)}</p>
                  <p className="text-xs text-[var(--text-muted)]">/10</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">AI Rating</p>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{aiScore.toFixed(1)}</p>
                  <p className="text-xs text-[var(--text-muted)]">/10</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">External Rating</p>
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{extRating}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CQ Rating Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Chronos Quant Rating</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--text-label)]">Fundamental Score</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">8/10</span>
                </div>
                <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
                  <div className="bg-[var(--progress-equities)] h-2 rounded-full w-[80%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--text-label)]">Technical Score</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">7.5/10</span>
                </div>
                <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
                  <div className="bg-[var(--progress-mutual-funds)] h-2 rounded-full w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--text-label)]">Valuation Score</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">7/10</span>
                </div>
                <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
                  <div className="bg-[var(--progress-fixed-income)] h-2 rounded-full w-[70%]" />
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              Last Updated: Today at 3:45 PM | Based on 50+ quantitative parameters
            </p>
          </div>

          {/* AI Analysis Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">AI Rating & Analysis</h3>
            <div className="bg-[var(--bg-card-inner)] rounded-lg p-4 border border-[var(--border-color)]">
              <p className="text-[var(--text-primary)] mb-4 leading-relaxed">
                Based on recent earnings, market trends, and technical indicators, our AI model rates this asset as a 
                strong investment opportunity with high conviction. The company demonstrates solid fundamentals with 
                consistent revenue growth and improving margins.
              </p>
              <div>
                <p className="text-sm font-medium text-[var(--text-label)] mb-3">Key Factors:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--icon-green-text)]">✅</span>
                    Strong earnings growth (positive)
                  </li>
                  <li className="flex gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--icon-green-text)]">✅</span>
                    Healthy balance sheet (positive)
                  </li>
                  <li className="flex gap-2 text-[var(--text-primary)]">
                    <span>⚠️</span>
                    Sector headwinds (neutral)
                  </li>
                  <li className="flex gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--icon-red-text)]">❌</span>
                    High valuation premium (negative)
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              Price Target: ₹3,200 | Range: ₹2,950 – ₹3,450
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <RatingsDisclaimer />
          </div>

          {/* Close Button */}
          <div className="mt-6">
            <Button onClick={onClose} className="w-full" variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
