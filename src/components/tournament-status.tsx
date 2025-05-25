import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Crown } from "lucide-react"
import type { GameState } from "@/types/game"

interface TournamentStatusProps {
  gameState: GameState
}

export function TournamentStatus({ gameState }: TournamentStatusProps) {
  const { tournament, players } = gameState

  if (!tournament.isActive) return null

  return (
    <Card className="w-full bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5 text-amber-600" />
          Tournament Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tournament Info */}
        <div className="text-center space-y-3">
          <Badge variant="outline" className="bg-white/70 border-amber-300 text-amber-800 px-4 py-1">
            Best of {tournament.totalGames}
          </Badge>
          <div className="text-sm text-gray-600">
            Game {tournament.currentGame} • First to {tournament.requiredWins} wins
          </div>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-4">
          {players.map((player, index) => {
            const wins = index === 0 ? tournament.gamesWon.player1 : tournament.gamesWon.player2
            const isLeading = wins > (index === 0 ? tournament.gamesWon.player2 : tournament.gamesWon.player1)
            const isChampion = wins >= tournament.requiredWins

            return (
              <div
                key={player.id}
                className={cn(
                  "text-center p-4 rounded-xl border-2 transition-all duration-300",
                  isChampion
                    ? "bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-400 shadow-lg"
                    : isLeading
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-md"
                      : "bg-white/70 border-gray-200",
                )}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isChampion && <Crown className="h-4 w-4 text-yellow-600" />}
                  <div className="font-semibold text-gray-900 text-sm">{player.name}</div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5 text-gray-600" />
                  <span className="text-2xl font-bold text-gray-900">{wins}</span>
                  <span className="text-sm text-gray-500">/{tournament.requiredWins}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress Visualization */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>{players[0].name}</span>
            <span>{players[1].name}</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              {/* Player 1 Progress */}
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-l-full transition-all duration-700 ease-out"
                style={{
                  width: `${(tournament.gamesWon.player1 / tournament.requiredWins) * 50}%`,
                }}
              ></div>
              {/* Player 2 Progress */}
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-r-full transition-all duration-700 ease-out absolute top-0 right-0"
                style={{
                  width: `${(tournament.gamesWon.player2 / tournament.requiredWins) * 50}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{tournament.gamesWon.player1} wins</span>
            <span>{tournament.gamesWon.player2} wins</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
