export interface EmojiPlacement {
  emoji: string
  timestamp: number
  position: number
}

export interface Player {
  id: 1 | 2
  name: string
  category: string
  emojis: string[]
  placements: EmojiPlacement[]
  score: number
  tournamentWins: number
}

export interface Tournament {
  isActive: boolean
  totalGames: 1 | 3 | 5 | 7
  currentGame: number
  winner: Player | null
  gamesWon: { player1: number; player2: number }
  requiredWins: number
}

export interface GameState {
  board: (string | null)[]
  currentPlayer: 1 | 2
  players: [Player, Player]
  gameStatus: "mode-selection" | "category-selection" | "playing" | "game-won" | "tournament-complete"
  winner: Player | null
  winningLine: number[] | null
  round: number
  tournament: Tournament
  gameMode: "single" | "tournament" | null
}

export interface EmojiCategory {
  name: string
  emojis: string[]
  icon: string
}
