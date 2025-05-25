import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Zap, Target } from "lucide-react"

interface ModeSelectionProps {
  onSelectSingle: () => void
  onSelectTournament: (size: 3 | 5 | 7) => void
}

export function ModeSelection({ onSelectSingle, onSelectTournament }: ModeSelectionProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Choose Your Battle
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your preferred game mode and prepare for an epic emoji showdown
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Single Game */}
          <Card className="group relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Quick Battle</CardTitle>
              <p className="text-gray-600">Fast-paced single game for instant fun</p>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Single match showdown</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Perfect for quick games</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Instant winner declaration</span>
                </div>
              </div>
              <Button
                onClick={onSelectSingle}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Quick Battle
              </Button>
            </CardContent>
          </Card>

          {/* Tournament */}
          <Card className="group relative overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Tournament Mode</CardTitle>
              <p className="text-gray-600">Epic best-of series competition</p>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Best-of series format</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Championship experience</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Ultimate bragging rights</span>
                </div>
              </div>
              <div className="space-y-3">
                {[3, 5, 7].map((size) => (
                  <Button
                    key={size}
                    onClick={() => onSelectTournament(size as 3 | 5 | 7)}
                    variant="outline"
                    className="w-full bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-400 text-purple-700 hover:text-purple-800 py-4 text-base font-medium transition-all duration-300 hover:shadow-md"
                  >
                    <Target className="mr-3 h-5 w-5" />
                    Best of {size} Games
                    <span className="ml-auto text-sm text-purple-500">(First to {Math.ceil(size / 2)})</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
