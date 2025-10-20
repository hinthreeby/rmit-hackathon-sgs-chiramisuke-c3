"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Difficulty, LeaderboardEntry } from "@/app/page"

interface MenuScreenProps {
  onStartGame: (difficulty: Difficulty) => void
  leaderboard: LeaderboardEntry[]
}

export default function MenuScreen({ onStartGame, leaderboard }: MenuScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy")
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedLeaderboardDifficulty, setSelectedLeaderboardDifficulty] = useState<Difficulty>("easy")

  const difficulties: { value: Difficulty; label: string; description: string; cards: number }[] = [
    { value: "easy", label: "Easy", description: "8 pairs (16 cards)", cards: 16 },
    { value: "medium", label: "Medium", description: "12 pairs (24 cards)", cards: 24 },
    { value: "hard", label: "Hard", description: "16 pairs (32 cards)", cards: 32 },
  ]

  const topScores = leaderboard.filter((entry) => entry.difficulty === selectedLeaderboardDifficulty).slice(0, 5)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {!showLeaderboard ? (
          <>
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-block mb-6">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mb-2 animate-pulse">
                  Climate Match
                </div>
              </div>
              <p className="text-xl text-slate-300 font-light">Learn about sustainability while matching cards</p>
            </div>

            {/* Main Card */}
            <Card
              className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8 p-8 md:p-12 shadow-2xl hover:shadow-green-500/20 transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="space-y-6">
                {/* Game Introduction */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">About This Game</h2>
                  <div className="space-y-3 text-slate-300">
                    <p className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                      <span className="text-green-400 font-bold mt-1">🌱</span>
                      <span>Match climate problems with sustainable solutions to learn about environmental action</span>
                    </p>
                    <p className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                      <span className="text-emerald-400 font-bold mt-1">♻️</span>
                      <span>Discover how everyday choices impact our planet and what we can do about it</span>
                    </p>
                    <p className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                      <span className="text-teal-400 font-bold mt-1">🌍</span>
                      <span>Compete with others and track your progress on the leaderboard</span>
                    </p>
                  </div>
                </div>

                {/* How to Play */}
                <div className="pt-4 border-t border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <p>1. Click on cards to reveal climate-related topics</p>
                    <p>
                      2. Match problems with their sustainable solutions (e.g., "Car Emissions" with "Public Transit")
                    </p>
                    <p>3. Complete all pairs to finish the level and earn points</p>
                    <p>4. Your score is based on speed and efficiency - fewer moves = higher score!</p>
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="pt-4 border-t border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Select Difficulty</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {difficulties.map((diff, index) => (
                      <button
                        key={diff.value}
                        onClick={() => setSelectedDifficulty(diff.value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                          selectedDifficulty === diff.value
                            ? "border-green-400 bg-green-500/20 shadow-lg shadow-green-500/50"
                            : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <p className="font-semibold text-white">{diff.label}</p>
                        <p className="text-sm text-slate-400">{diff.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="pt-4 border-t border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                    <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Educational Content</span>
                    </div>
                    <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span>3 Difficulty Levels</span>
                    </div>
                    <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span>Score Tracking</span>
                    </div>
                    <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Global Leaderboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Start Button */}
            <div className="flex flex-col gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button
                onClick={() => onStartGame(selectedDifficulty)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
              >
                Start Game
              </Button>
              {leaderboard.length > 0 && (
                <Button
                  onClick={() => setShowLeaderboard(true)}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent transition-all duration-200 hover:scale-105"
                >
                  View Leaderboard
                </Button>
              )}
              <p className="text-center text-xs text-slate-400">Ready to learn about climate action?</p>
            </div>
          </>
        ) : (
          <>
            {/* Leaderboard View */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-8 mb-6 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Global Leaderboard</h2>

              {/* Difficulty Tabs */}
              <div className="flex gap-2 mb-6 justify-center">
                {(["easy", "medium", "hard"] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedLeaderboardDifficulty(diff)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedLeaderboardDifficulty === diff
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>

              {/* Top Scores */}
              <div className="space-y-2 mb-6">
                {topScores.length > 0 ? (
                  topScores.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:bg-slate-700/70 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{entry.score} points</p>
                          <p className="text-sm text-slate-400">{entry.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300">
                        {entry.moves} moves • {entry.time}s
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">No scores yet for this difficulty</div>
                )}
              </div>
            </Card>

            {/* Back Button */}
            <Button
              onClick={() => setShowLeaderboard(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Back to Menu
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
