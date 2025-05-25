import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, Crown, Star } from "lucide-react"
import type { GameState } from "@/types/game"

interface GameStatusProps {
  gameState: GameState
}

export function GameStatus({ gameState }: GameStatusProps) {
  const { currentPlayer, players, gameStatus, winner, tournament, gameMode } = gameState
  const activePlayer = players[currentPlayer - 1]

  if (gameStatus === "tournament-complete" && tournament.winner) {
    return (
      <Card className="w-full bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 border-2 border-yellow-400 shadow-2xl">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Crown className="h-12 w-12 text-yellow-600 animate-bounce" />
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Tournament Champion!
                </div>
                <div className="text-xl font-semibold text-gray-800">{tournament.winner.name} Wins!</div>
              </div>
              <Crown className="h-12 w-12 text-yellow-600 animate-bounce" />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="text-base px-6 py-2 bg-white/70 border-yellow-300">
                Best of {tournament.totalGames}
              </Badge>
              <Badge variant="secondary" className="text-base px-6 py-2 bg-white/70 border-yellow-300">
                {tournament.winner.category}
              </Badge>
            </div>

            <div className="bg-white/50 rounded-xl p-4 border border-yellow-200">
              <div className="text-lg font-semibold text-gray-700 mb-2">Final Score</div>
              <div className="text-2xl font-bold text-gray-900">
                {tournament.gamesWon.player1} - {tournament.gamesWon.player2}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (gameStatus === "game-won" && winner) {
    const isGameInTournament = gameMode === "tournament"

    return (
      <Card className="w-full bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 shadow-xl">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              {isGameInTournament ? (
                <Star className="h-8 w-8 text-green-600 animate-pulse" />
              ) : (
                <Trophy className="h-8 w-8 text-green-600" />
              )}
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                {winner.name} Wins {isGameInTournament ? "Game" : ""}!
              </div>
            </div>

            <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/70">
              {winner.category}
            </Badge>

            {isGameInTournament && (
              <div className="bg-white/50 rounded-lg p-3 border border-green-200">
                <div className="text-sm text-gray-600">
                  Game {tournament.currentGame - 1} Complete • Tournament Continues
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (gameStatus === "playing") {
    return (
      <div className="space-y-4">
        {/* Current Turn */}
        <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-lg">
          <CardContent className="pt-4 pb-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  {activePlayer.name}
                  {"'"}s Turn
                </div>
              </div>
              <Badge variant="outline" className="text-sm bg-white/70 border-blue-300 text-blue-800">
                {activePlayer.category}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Player Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {players.map((player) => {
            const isActive = player.id === currentPlayer
            const willRemoveOldest = player.placements.length >= 3

            return (
              <Card
                key={player.id}
                className={cn(
                  "border-2 shadow-md transition-all duration-300 transform-gpu",
                  isActive
                    ? "border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 scale-105 shadow-lg"
                    : "border-gray-200 bg-white hover:shadow-lg",
                )}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="space-y-3">
                    {/* Player Info */}
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-base">{player.name}</div>
                      <div className="text-sm text-gray-600">{player.category}</div>
                    </div>

                    {/* Emoji Count */}
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Active Emojis</div>
                      <div className="text-xl font-bold text-gray-900">{player.placements.length}/3</div>
                    </div>

                    {/* Current Emojis */}
                    {player.placements.length > 0 && (
                      <div className="flex justify-center gap-2">
                        {player.placements
                          .sort((a, b) => a.timestamp - b.timestamp)
                          .map((placement, index) => (
                            <div
                              key={placement.timestamp}
                              className={cn(
                                "w-10 h-10 flex items-center justify-center text-xl rounded-lg border-2 transition-all duration-300",
                                index === 0 && willRemoveOldest
                                  ? "bg-red-50 border-red-300 opacity-70 animate-pulse"
                                  : "bg-gray-50 border-gray-300",
                              )}
                            >
                              {placement.emoji}
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Warning Message */}
                    {isActive && willRemoveOldest && (
                      <div className="text-xs text-center text-amber-800 bg-amber-100 px-3 py-2 rounded-lg border border-amber-300">
                        ⚠️ Next move removes oldest emoji
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
