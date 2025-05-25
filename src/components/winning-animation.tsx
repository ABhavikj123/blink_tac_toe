"use client"

import { useEffect, useState } from "react"
import { Trophy } from "lucide-react"
import type { Player } from "@/types/game"

interface WinningAnimationProps {
  winner: Player
  onComplete: () => void
}

export function WinningAnimation({ winner, onComplete }: WinningAnimationProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 text-center space-y-6 shadow-2xl max-w-md w-full animate-in zoom-in-75 duration-500">
        <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />

        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">🎉 Victory! 🎉</div>
          <div className="text-xl font-semibold text-gray-700">{winner.name} Wins!</div>
        </div>

        <div className="px-4 py-2 bg-gray-100 rounded-lg">
          <div className="text-sm text-gray-600">Category: {winner.category}</div>
        </div>

        <div className="flex justify-center gap-3">
          {winner.placements.map((placement, index) => (
            <div
              key={placement.timestamp}
              className="text-3xl p-2 bg-gray-50 rounded-lg border animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {placement.emoji}
            </div>
          ))}
        </div>

        <div className="text-gray-600">Congratulations on your victory!</div>
      </div>
    </div>
  )
}
