"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target } from "lucide-react"
import type { GameState } from "@/types/game"

interface ScoreTrackerProps {
  gameState: GameState
}

export function ScoreTracker({ gameState }: ScoreTrackerProps) {
  const { players, round, tournament } = gameState

  return (
    <Card className="w-full bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
          {tournament.isActive ? "Tournament Score" : "Score Tracker"}
        </CardTitle>
        <div className="text-center">
          <Badge variant="outline" className="text-xs sm:text-sm">
            {tournament.isActive ? `Game ${tournament.currentGame}` : `Round ${round}`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="space-y-2 sm:space-y-3">
          {players.map((player, index) => {
            const score = tournament.isActive
              ? index === 0
                ? tournament.gamesWon.player1
                : tournament.gamesWon.player2
              : player.score

            return (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md"
              >
                <div className="space-y-1">
                  <div className="font-medium text-gray-900 text-sm sm:text-base">{player.name}</div>
                  {player.category && <div className="text-xs sm:text-sm text-gray-500">{player.category}</div>}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Target className="h-4 w-4 text-gray-600" />
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{score}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
