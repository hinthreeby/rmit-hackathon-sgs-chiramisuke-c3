"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Difficulty, LeaderboardEntry } from "@/app/page"

interface ResultsScreenProps {
  score: number
  moves: number
  time: number
  difficulty: Difficulty
  leaderboard: LeaderboardEntry[]
  onBackToMenu: () => void
}

export default function ResultsScreen({
  score,
  moves,
  time,
  difficulty,
  leaderboard,
  onBackToMenu,
}: ResultsScreenProps) {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulty)

  const getRating = (score: number) => {
    if (score >= 900) return { label: "Perfect!", color: "text-yellow-400", emoji: "🏆" }
    if (score >= 800) return { label: "Excellent!", color: "text-green-400", emoji: "⭐" }
    if (score >= 700) return { label: "Great!", color: "text-blue-400", emoji: "👍" }
    if (score >= 600) return { label: "Good!", color: "text-purple-400", emoji: "✨" }
    return { label: "Nice Try!", color: "text-slate-400", emoji: "🎮" }
  }

  const rating = getRating(score)
  const filteredLeaderboard = leaderboard.filter((entry) => entry.difficulty === selectedDifficulty)
  const topScores = filteredLeaderboard.slice(0, 10)
  const playerRank = filteredLeaderboard.findIndex((entry) => entry.score === score) + 1

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {!showLeaderboard ? (
          <>
            {/* Results Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-8 mb-6 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{rating.emoji}</div>
                <h1 className={`text-4xl font-bold mb-2 ${rating.color}`}>{rating.label}</h1>
                <p className="text-slate-400">Game completed on {difficulty} difficulty</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
                  <p className="text-slate-400 text-sm mb-2">Final Score</p>
                  <p className="text-5xl font-bold text-blue-400">{score}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-slate-400 text-sm mb-2">Moves</p>
                    <p className="text-3xl font-bold text-purple-400">{moves}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-slate-400 text-sm mb-2">Time</p>
                    <p className="text-3xl font-bold text-pink-400">{time}s</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-slate-400 text-sm mb-2">Rank</p>
                    <p className="text-3xl font-bold text-cyan-400">#{playerRank}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-slate-700/30 rounded-lg p-4 mb-8 border border-slate-600">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Efficiency</p>
                    <p className="text-lg font-semibold text-slate-200">
                      {moves > 0 ? ((moves / (moves + time)) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Avg Time/Move</p>
                    <p className="text-lg font-semibold text-slate-200">{moves > 0 ? (time / moves).toFixed(1) : 0}s</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => setShowLeaderboard(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                View Leaderboard
              </Button>
              <Button
                onClick={onBackToMenu}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Back to Menu
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Leaderboard */}
            <Card className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-8 mb-6 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Leaderboard</h2>

              {/* Difficulty Tabs */}
              <div className="flex gap-2 mb-6 justify-center">
                {(["easy", "medium", "hard"] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedDifficulty === diff
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>

              {/* Leaderboard List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {topScores.length > 0 ? (
                  topScores.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        entry.score === score
                          ? "bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20"
                          : "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </div>
                        <div>
                          <p className="font-semibold text-white">Score: {entry.score}</p>
                          <p className="text-sm text-slate-400">{entry.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-300">
                          {entry.moves} moves • {entry.time}s
                        </p>
                      </div>
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
              Back to Results
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
