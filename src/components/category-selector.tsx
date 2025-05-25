import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Palette } from "lucide-react"
import { EMOJI_CATEGORIES, createCustomCategory } from "@/lib/emoji-categories"
import type { EmojiCategory, Player } from "@/types/game"

interface CategorySelectorProps {
  player: Player
  onCategorySelect: (category: string, emojis: string[]) => void
  disabled?: boolean
}

export function CategorySelector({ player, onCategorySelect, disabled }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [customEmojis, setCustomEmojis] = useState<string>("")
  const [showCustom, setShowCustom] = useState(false)

  const handleCategorySelect = (category: EmojiCategory) => {
    setSelectedCategory(category.name)
    onCategorySelect(category.name, category.emojis)
  }

  const handleCustomSubmit = () => {
    const emojis = customEmojis.split("").filter((char) => /\p{Emoji}/u.test(char) && char !== "️")

    if (emojis.length >= 4) {
      const customCategory = createCustomCategory(emojis)
      setSelectedCategory("Custom")
      onCategorySelect("Custom", customCategory.emojis)
    }
  }

  if (disabled && player.category) {
    return (
      <Card className="w-full bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-base sm:text-lg font-semibold text-gray-900">{player.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {player.category}
            </Badge>
          </div>
          <div className="flex justify-center gap-1 sm:gap-2">
            {player.emojis.slice(0, 4).map((emoji, index) => (
              <div
                key={index}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl bg-gray-50 rounded-lg border transition-transform duration-300 hover:scale-110"
              >
                {emoji}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-base sm:text-lg font-semibold text-gray-900">
          {player.name} - Choose Category
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {EMOJI_CATEGORIES.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className={cn(
                "h-16 sm:h-20 flex flex-col gap-1 transition-all duration-300 transform-gpu",
                selectedCategory === category.name
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 scale-105 shadow-lg"
                  : "bg-white hover:bg-gray-50 text-gray-900 border-gray-200 hover:scale-105 hover:shadow-md",
              )}
              onClick={() => handleCategorySelect(category)}
              disabled={disabled}
            >
              <span className="text-xl sm:text-2xl">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => setShowCustom(!showCustom)}
            disabled={disabled}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-200 transition-all duration-300 hover:shadow-md"
          >
            <Palette className="mr-2 h-4 w-4" />
            Create Custom Category
          </Button>

          {showCustom && (
            <div className="space-y-3 p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <Label htmlFor="custom-emojis" className="text-sm font-medium text-gray-700">
                Enter at least 4 emojis:
              </Label>
              <Input
                id="custom-emojis"
                value={customEmojis}
                onChange={(e) => setCustomEmojis(e.target.value)}
                placeholder="🎮🎯🎲🎪🎨🎭🎪🎊"
                disabled={disabled}
                className="bg-white border-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleCustomSubmit}
                disabled={disabled || customEmojis.split("").filter((char) => /\p{Emoji}/u.test(char)).length < 4}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:shadow-md"
              >
                Use Custom Emojis
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
