import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeSelection } from "@/components/mode-selection"
import { CategorySelector } from "@/components/category-selector"
import { GameBoard } from "@/components/game-board"
import { GameStatus } from "@/components/game-status"
import { ScoreTracker } from "@/components/score-tracker"
import { TournamentStatus } from "@/components/tournament-status"
import { HelpModal } from "@/components/help-modal"
import { WinningAnimation } from "@/components/winning-animation"
import { initializeGame, initializeSingleGame, initializeTournament, makeMove, resetGameBoard } from "@/lib/game-logic"
import { getRandomEmoji } from "@/lib/emoji-categories"
import type { GameState } from "@/types/game"
import { RotateCcw, Play, Gamepad2, ArrowLeft } from "lucide-react"
import { Analytics } from '@vercel/analytics/react';
export default function App() {
  const [gameState, setGameState] = useState<GameState>(initializeGame())
  const [showWinAnimation, setShowWinAnimation] = useState(false)

  const handleSelectSingle = useCallback(() => {
    setGameState(initializeSingleGame())
  }, [])

  const handleSelectTournament = useCallback((size: 3 | 5 | 7) => {
    setGameState(initializeTournament(size))
  }, [])

  const handleCategorySelect = useCallback((playerId: 1 | 2, category: string, emojis: string[]) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) => (player.id === playerId ? { ...player, category, emojis } : player)) as [
        (typeof prev.players)[0],
        (typeof prev.players)[1],
      ],
    }))
  }, [])

  const handleStartGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, gameStatus: "playing" }))
  }, [])

  const handleCellClick = useCallback(
    (position: number) => {
      if (gameState.gameStatus !== "playing") return

      const currentPlayer = gameState.players[gameState.currentPlayer - 1]
      const randomEmoji = getRandomEmoji(currentPlayer.category)

      const newGameState = makeMove(gameState, position, randomEmoji)
      setGameState(newGameState)

      if (newGameState.gameStatus === "game-won" || newGameState.gameStatus === "tournament-complete") {
        setShowWinAnimation(true)
      }
    },
    [gameState],
  )

  const handleNextGame = useCallback(() => {
    setGameState((prev) => resetGameBoard(prev))
  }, [])

  const handleNewTournament = useCallback(() => {
    if (gameState.gameMode === "tournament") {
      setGameState(
        initializeTournament(
          gameState.tournament.totalGames === 1 ? 3 : gameState.tournament.totalGames
        )
      )
    } else {
      setGameState(initializeSingleGame())
    }
  }, [gameState.gameMode, gameState.tournament.totalGames])

  const handleBackToModeSelection = useCallback(() => {
    setGameState(initializeGame())
  }, [])

  const handleWinAnimationComplete = useCallback(() => {
    setShowWinAnimation(false)
  }, [])

  const canStartGame = gameState.players.every((player) => player.category && player.emojis.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {gameState.gameStatus !== "mode-selection" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToModeSelection}
                    className="bg-white/70 hover:bg-white border-gray-300 hover:border-gray-400 transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Menu
                  </Button>
                )}
              </div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
                <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                Blink Tac Toe
              </CardTitle>
              <div className="flex-1 flex justify-end">
                <HelpModal />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-base sm:text-lg text-gray-700 font-medium">Strategic Emoji Tic Tac Toe</p>
            </div>
          </CardHeader>
        </Card>

        {/* Mode Selection */}
        {gameState.gameStatus === "mode-selection" && (
          <ModeSelection onSelectSingle={handleSelectSingle} onSelectTournament={handleSelectTournament} />
        )}

        {/* Category Selection */}
        {gameState.gameStatus === "category-selection" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Choose Your Emoji Arsenal</h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Each player must select their emoji category before the{" "}
                {gameState.gameMode === "tournament" ? "tournament" : "battle"} begins
              </p>
              {gameState.gameMode === "tournament" && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-xl p-4 max-w-md mx-auto">
                  <div className="text-purple-800 font-semibold">
                    🏆 Tournament Mode: Best of {gameState.tournament.totalGames}
                  </div>
                  <div className="text-purple-600 text-sm">
                    First to {gameState.tournament.requiredWins} wins takes the crown!
                  </div>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <CategorySelector
                player={gameState.players[0]}
                onCategorySelect={(category, emojis) => handleCategorySelect(1, category, emojis)}
              />
              <CategorySelector
                player={gameState.players[1]}
                onCategorySelect={(category, emojis) => handleCategorySelect(2, category, emojis)}
              />
            </div>

            {canStartGame && (
              <div className="text-center">
                <Button
                  onClick={handleStartGame}
                  size="lg"
                  className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Play className="mr-3 h-6 w-6" />
                  {gameState.gameMode === "tournament" ? "Begin Tournament" : "Start Battle"}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Game Area */}
        {(gameState.gameStatus === "playing" ||
          gameState.gameStatus === "game-won" ||
          gameState.gameStatus === "tournament-complete") && (
          <div className="grid xl:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="xl:col-span-3 space-y-6">
              <CategorySelector player={gameState.players[0]} onCategorySelect={() => {}} disabled={true} />
              <ScoreTracker gameState={gameState} />
              {gameState.gameMode === "tournament" && <TournamentStatus gameState={gameState} />}
            </div>

            {/* Center - Game Board */}
            <div className="xl:col-span-6 space-y-6">
              <GameStatus gameState={gameState} />
              <GameBoard gameState={gameState} onCellClick={handleCellClick} />

              {/* Game Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {gameState.gameStatus === "game-won" && gameState.gameMode === "tournament" && (
                  <Button
                    onClick={handleNextGame}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Next Game
                  </Button>
                )}

                {(gameState.gameStatus === "tournament-complete" ||
                  (gameState.gameStatus === "game-won" && gameState.gameMode === "single")) && (
                  <Button
                    onClick={handleNewTournament}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {gameState.gameMode === "tournament" ? "New Tournament" : "Play Again"}
                  </Button>
                )}

                <Button
                  onClick={handleBackToModeSelection}
                  variant="outline"
                  size="lg"
                  className="bg-white/70 hover:bg-white border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  New Game
                </Button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-3 space-y-6">
              <CategorySelector player={gameState.players[1]} onCategorySelect={() => {}} disabled={true} />

              {/* Quick Rules */}
              <Card className="bg-white/90 border-2 border-gray-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900">Game Rules</CardTitle>
                </CardHeader>
                <div className="px-6 pb-6 space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Maximum 3 emojis per player on board</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Oldest emoji vanishes when placing 4th</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Get 3 in a row to win the game</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Random emoji from your category</span>
                  </div>
                  {gameState.gameMode === "tournament" && (
                    <div className="pt-3 border-t border-gray-200 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Tournament: Best of {gameState.tournament.totalGames}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>First to {gameState.tournament.requiredWins} wins the crown</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Winning Animation */}
        {showWinAnimation && gameState.winner && (
          <WinningAnimation winner={gameState.winner} onComplete={handleWinAnimationComplete} />
        )}
      </div>
      <Analytics />
    </div>
  )
}
