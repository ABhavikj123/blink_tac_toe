import type { EmojiCategory } from "@/types/game"

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    name: "Animals",
    icon: "🐶",
    emojis: ["🐶", "🐱", "🐵", "🐰", "🦊", "🐻", "🐼", "🐨"],
  },
  {
    name: "Food",
    icon: "🍔",
    emojis: ["🍕", "🍟", "🍔", "🍩", "🌮", "🍎", "🍌", "🍓"],
  },
  {
    name: "Sports",
    icon: "⚽",
    emojis: ["⚽", "🏀", "🏈", "🎾", "🏐", "🏓", "🥎", "🏸"],
  },
  {
    name: "Nature",
    icon: "🌸",
    emojis: ["🌸", "🌺", "🌻", "🌷", "🌹", "🌿", "🍀", "🌳"],
  },
  {
    name: "Space",
    icon: "🚀",
    emojis: ["🚀", "🛸", "⭐", "🌟", "🌙", "☄️", "🪐", "🌍"],
  },
  {
    name: "Vehicles",
    icon: "🚗",
    emojis: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑"],
  },
]

export const getRandomEmoji = (category: string): string => {
  const categoryData = EMOJI_CATEGORIES.find((cat) => cat.name === category)
  if (!categoryData) return "❓"

  const randomIndex = Math.floor(Math.random() * categoryData.emojis.length)
  return categoryData.emojis[randomIndex]
}

export const createCustomCategory = (emojis: string[]): EmojiCategory => {
  return {
    name: "Custom",
    icon: emojis[0] || "🎨",
    emojis: emojis.slice(0, 8), // Limit to 8 emojis
  }
}
