# Blink Tac Toe

A strategic twist on classic Tic Tac Toe with emoji categories and vanishing rules, built with React, TypeScript, and Vite.

---

## 🎯 How to Play

**Objective:**  
Be the first player to get 3 of your emojis in a row (horizontal, vertical, or diagonal).

### 🎮 Setup

- Each player chooses an emoji category before the game starts.
- Categories include Animals, Food, Sports, Nature, Space, Vehicles, or you can create your own.
- Player 1 goes first, then players alternate turns.

### 💨 The Vanishing Rule

- Each player can only have **3 emojis** on the board at once.
- When you try to place a 4th emoji, your **oldest emoji vanishes**.
- The new emoji cannot be placed where the old one just vanished.
- That cell becomes empty and available for future moves.

### 🏆 Winning

- Get 3 of your emojis in a row (any direction).
- All 3 emojis must be from your chosen category.
- The game highlights the winning combination.
- No draws are possible due to the vanishing rule.

---

## 🚀 Features

- Emoji category selection (preset or custom)
- Tournament and single-game modes
- Animated, responsive game board
- Score tracking and tournament status
- In-game help modal with rules and tips

---

## 📁 Folder Structure

```
blink_tac_toe/
├── src/
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   ├── assets/           # App-specific images (e.g., react.svg)
│   ├── components/  
|   |   ├──ui/                   # UI and game components
│   │   ├── category-selector.tsx
│   │   ├── game-board.tsx
│   │   ├── game-status.tsx
│   │   ├── help-modal.tsx
│   │   ├── mode-selection.tsx
│   │   ├── score-tracker.tsx
│   │   ├── tournament-setup.tsx
│   │   └── tournament-status.tsx
│   ├── lib/              # Game logic and emoji utilities
│   │   ├── emoji-categories.ts
│   │   └── game-logic.ts
│   └── types/            # TypeScript types
│       └── game.ts
├── index.html            # HTML entry point
├── package.json          # Project metadata and scripts
├── vite.config.ts        # Vite configuration
├── tsconfig*.json        # TypeScript configuration
└── README.md             # Project documentation
```

---

## 🛠️ Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

---

## 🧩 Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📄 License

This project is licensed under the MIT License.