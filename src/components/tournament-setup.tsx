"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Zap } from "lucide-react"

interface TournamentSetupProps {
  onSelectMode: (mode: "single" | "tournament") => void
  onSelectTournamentSize: (size: 3 | 5 | 7) => void
}

export function TournamentSetup({ onSelectMode, onSelectTournamentSize }: TournamentSetupProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Choose Game Mode</h2>
        <p className="text-gray-600 text-sm sm:text-base">Select between single game or tournament mode</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Single Game */}
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">Single Game</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 text-sm">Quick single match between two players</p>
            <Button
              onClick={() => onSelectMode("single")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
            >
              Start Single Game
            </Button>
          </CardContent>
        </Card>

        {/* Tournament */}
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">Tournament Mode</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 text-sm">Best-of series competition</p>
            <div className="space-y-2">
              {[3, 5, 7].map((size) => (
                <Button
                  key={size}
                  onClick={() => onSelectTournamentSize(size as 3 | 5 | 7)}
                  variant="outline"
                  className="w-full bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-300 transition-all duration-300"
                >
                  <Target className="mr-2 h-4 w-4" />
                  Best of {size}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
