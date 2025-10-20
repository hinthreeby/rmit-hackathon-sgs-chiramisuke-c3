"use client"

import { useState, useEffect } from "react"
import MenuScreen from "@/components/menu-screen"
import GameBoard from "@/components/game-board"
import ResultsScreen from "@/components/results-screen"

export type Difficulty = "easy" | "medium" | "hard"

export interface LeaderboardEntry {
  id: string
  score: number
  moves: number
  time: number
  difficulty: Difficulty
  date: string
}

export default function Home() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "results">("menu")
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [gameScore, setGameScore] = useState<number>(0)
  const [gameMoves, setGameMoves] = useState<number>(0)
  const [gameTime, setGameTime] = useState<number>(0)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  // Load leaderboard from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cardMatchLeaderboard")
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load leaderboard:", e)
      }
    }
  }, [])

  // Save leaderboard to localStorage
  useEffect(() => {
    localStorage.setItem("cardMatchLeaderboard", JSON.stringify(leaderboard))
  }, [leaderboard])

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty)
    setGameState("playing")
  }

  const handleGameComplete = (score: number, moves: number, time: number) => {
    setGameScore(score)
    setGameMoves(moves)
    setGameTime(time)

    // Add to leaderboard
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      score,
      moves,
      time,
      difficulty,
      date: new Date().toLocaleDateString(),
    }

    setLeaderboard((prev) => [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 50))

    setGameState("results")
  }

  const handleBackToMenu = () => {
    setGameState("menu")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {gameState === "menu" && <MenuScreen onStartGame={handleStartGame} leaderboard={leaderboard} />}
      {gameState === "playing" && (
        <GameBoard difficulty={difficulty} onGameComplete={handleGameComplete} onBackToMenu={handleBackToMenu} />
      )}
      {gameState === "results" && (
        <ResultsScreen
          score={gameScore}
          moves={gameMoves}
          time={gameTime}
          difficulty={difficulty}
          leaderboard={leaderboard}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </main>
  )
}
