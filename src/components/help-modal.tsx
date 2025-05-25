import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"

export function HelpModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-white hover:bg-gray-50 border-gray-200">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">How to Play Blink Tac Toe</DialogTitle>
          <DialogDescription className="text-gray-600">
            A strategic twist on classic Tic Tac Toe with emoji categories and vanishing rules.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">🎯 Objective</h3>
            <p>Be the first player to get 3 of your emojis in a row (horizontal, vertical, or diagonal).</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900">🎮 Setup</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Each player chooses an emoji category before the game starts</li>
              <li>Categories include Animals, Food, Sports, Nature, Space, Vehicles, or create your own</li>
              <li>Player 1 goes first, then players alternate turns</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900">💨 The Vanishing Rule</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Each player can only have <strong>3 emojis</strong> on the board at once
              </li>
              <li>
                When you try to place a 4th emoji, your <strong>oldest emoji vanishes</strong>
              </li>
              <li>The new emoji cannot be placed where the old one just vanished</li>
              <li>That cell becomes empty and available for future moves</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900">🏆 Winning</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Get 3 of your emojis in a row (any direction)</li>
              <li>All 3 emojis must be from your chosen category</li>
              <li>The game highlights the winning combination</li>
              <li>No draws are possible due to the vanishing rule</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900">🎲 Strategy Tips</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Remember which emoji will vanish next (the oldest one)</li>
              <li>Plan your moves considering the 3-emoji limit</li>
              <li>Block your opponent while setting up your own winning line</li>
              <li>Use the vanishing rule to your advantage</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
