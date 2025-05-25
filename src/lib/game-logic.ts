import type { GameState, Player, EmojiPlacement } from "@/types/game"

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
]

export const checkWinner = (
  board: (string | null)[],
  players: [Player, Player],
): {
  winner: Player | null
  winningLine: number[] | null
} => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination

    if (board[a] && board[b] && board[c]) {
      const playerA = players.find((player) => player.placements.some((placement) => placement.position === a))
      const playerB = players.find((player) => player.placements.some((placement) => placement.position === b))
      const playerC = players.find((player) => player.placements.some((placement) => placement.position === c))

      if (playerA && playerB && playerC && playerA.id === playerB.id && playerB.id === playerC.id) {
        return { winner: playerA, winningLine: combination }
      }
    }
  }

  return { winner: null, winningLine: null }
}

export const getOldestPlacement = (placements: EmojiPlacement[]): EmojiPlacement | null => {
  if (placements.length === 0) return null
  return placements.reduce((oldest, current) => (current.timestamp < oldest.timestamp ? current : oldest))
}

export const makeMove = (gameState: GameState, position: number, emoji: string): GameState => {
  const newBoard = [...gameState.board]
  const newPlayers = [...gameState.players] as [Player, Player]
  const currentPlayerIndex = gameState.currentPlayer - 1
  const currentPlayer = { ...newPlayers[currentPlayerIndex] }

  newPlayers[currentPlayerIndex] = currentPlayer

  if (currentPlayer.placements.length >= 3) {
    const oldestPlacement = getOldestPlacement(currentPlayer.placements)
    if (oldestPlacement) {
      newBoard[oldestPlacement.position] = null
      currentPlayer.placements = currentPlayer.placements.filter((p) => p.timestamp !== oldestPlacement.timestamp)
    }
  }

  newBoard[position] = emoji
  const newPlacement: EmojiPlacement = {
    emoji,
    timestamp: Date.now(),
    position,
  }
  currentPlayer.placements = [...currentPlayer.placements, newPlacement]

  const { winner, winningLine } = checkWinner(newBoard, newPlayers)

  let newGameStatus = gameState.gameStatus
  const newTournament = { ...gameState.tournament }

  if (winner) {
    if (gameState.gameMode === "tournament") {
      // Tournament logic
      if (winner.id === 1) {
        newTournament.gamesWon.player1++
      } else {
        newTournament.gamesWon.player2++
      }

      // Check if tournament is complete
      if (
        newTournament.gamesWon.player1 >= newTournament.requiredWins ||
        newTournament.gamesWon.player2 >= newTournament.requiredWins
      ) {
        newGameStatus = "tournament-complete"
        newTournament.winner =
          newTournament.gamesWon.player1 >= newTournament.requiredWins ? newPlayers[0] : newPlayers[1]
      } else {
        newGameStatus = "game-won"
        newTournament.currentGame++
      }
    } else {
      // Single game logic
      newGameStatus = "game-won"
    }
  }

  return {
    ...gameState,
    board: newBoard,
    currentPlayer: gameState.currentPlayer === 1 ? 2 : 1,
    gameStatus: newGameStatus,
    winner,
    winningLine,
    players: newPlayers,
    tournament: newTournament,
  }
}

export const resetGameBoard = (gameState: GameState): GameState => {
  return {
    ...gameState,
    board: Array(9).fill(null),
    currentPlayer: 1,
    gameStatus: "playing",
    winner: null,
    winningLine: null,
    players: [
      { ...gameState.players[0], placements: [] },
      { ...gameState.players[1], placements: [] },
    ],
  }
}

export const initializeSingleGame = (): GameState => {
  return {
    board: Array(9).fill(null),
    currentPlayer: 1,
    players: [
      {
        id: 1,
        name: "Player 1",
        category: "",
        emojis: [],
        placements: [],
        score: 0,
        tournamentWins: 0,
      },
      {
        id: 2,
        name: "Player 2",
        category: "",
        emojis: [],
        placements: [],
        score: 0,
        tournamentWins: 0,
      },
    ],
    gameStatus: "category-selection",
    winner: null,
    winningLine: null,
    round: 1,
    gameMode: "single",
    tournament: {
      isActive: false,
      totalGames: 1,
      currentGame: 1,
      winner: null,
      gamesWon: { player1: 0, player2: 0 },
      requiredWins: 1,
    },
  }
}

export const initializeTournament = (totalGames: 3 | 5 | 7): GameState => {
  const requiredWins = Math.ceil(totalGames / 2)

  return {
    board: Array(9).fill(null),
    currentPlayer: 1,
    players: [
      {
        id: 1,
        name: "Player 1",
        category: "",
        emojis: [],
        placements: [],
        score: 0,
        tournamentWins: 0,
      },
      {
        id: 2,
        name: "Player 2",
        category: "",
        emojis: [],
        placements: [],
        score: 0,
        tournamentWins: 0,
      },
    ],
    gameStatus: "category-selection",
    winner: null,
    winningLine: null,
    round: 1,
    gameMode: "tournament",
    tournament: {
      isActive: true,
      totalGames,
      currentGame: 1,
      winner: null,
      gamesWon: { player1: 0, player2: 0 },
      requiredWins,
    },
  }
}

export const initializeGame = (): GameState => {
  return {
    board: Array(9).fill(null),
    currentPlayer: 1,
    players: [
      {
        id: 1,
        name: "Player 1",
        category: "",
        emojis: [],
        placements: [],
        score: 0,
        tournamentWins: 0,
      },
      {
        id: 2,
        name: "Player 2",
        category: "",
        emojis: [],
        placements: [],
        score: 0,
        tournamentWins: 0,
      },
    ],
    gameStatus: "mode-selection",
    winner: null,
    winningLine: null,
    round: 1,
    gameMode: null,
    tournament: {
      isActive: false,
      totalGames: 3,
      currentGame: 1,
      winner: null,
      gamesWon: { player1: 0, player2: 0 },
      requiredWins: 2,
    },
  }
}
