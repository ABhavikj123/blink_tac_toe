import { cn } from "@/lib/utils"
import type { GameState } from "@/types/game"

interface GameBoardProps {
  gameState: GameState
  onCellClick: (position: number) => void
}

export function GameBoard({ gameState, onCellClick }: GameBoardProps) {
  const { board, gameStatus, winningLine } = gameState

  const isCellWinning = (index: number): boolean => {
    return winningLine?.includes(index) || false
  }

  const isCellClickable = (index: number): boolean => {
    return gameStatus === "playing" && board[index] === null
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
      {/* Game Board */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
        <div className="relative grid grid-cols-3 gap-2 sm:gap-3 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50">
          {board.map((cell, index) => (
            <button
              key={index}
              className={cn(
                // Responsive sizing
                "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28",
                "flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-medium",
                "border-2 rounded-xl sm:rounded-2xl transition-all duration-300 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "transform-gpu", // Hardware acceleration
                // Default state
                "border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100",
                // Winning state
                isCellWinning(index) &&
                  "bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-300 shadow-lg shadow-emerald-200/50 animate-pulse",
                // Clickable state
                isCellClickable(index) &&
                  "hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:shadow-md hover:scale-105 cursor-pointer active:scale-95",
                // Non-clickable state
                !isCellClickable(index) && cell === null && "cursor-not-allowed opacity-40",
                // Filled cell
                cell && "bg-gradient-to-br from-white to-gray-50 border-gray-300 shadow-sm",
              )}
              onClick={() => isCellClickable(index) && onCellClick(index)}
              disabled={!isCellClickable(index)}
            >
              <span
                className={cn(
                  "transition-all duration-500 ease-out drop-shadow-sm",
                  cell && "animate-in zoom-in-75 duration-500",
                )}
              >
                {cell}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
