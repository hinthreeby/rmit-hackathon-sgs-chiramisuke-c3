"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import GameCard from "@/components/game-card"
import type { Difficulty } from "@/app/page"

interface GameBoardProps {
  difficulty: Difficulty
  onGameComplete: (score: number, moves: number, time: number) => void
  onBackToMenu: () => void
}

interface Card {
  id: number
  image: string
  label: string
  category: string
  isFlipped: boolean
  isMatched: boolean
}

const CLIMATE_CARDS = [
  { image: "/car-emissions-pollution.jpg", label: "Car Emissions", category: "transport" },
  { image: "/public-transit-bus-train.jpg", label: "Public Transit", category: "transport" },
  { image: "/energy-waste-light-bulb.jpg", label: "Energy Waste", category: "energy" },
  { image: "/solar-panel-renewable-energy.jpg", label: "Solar Power", category: "energy" },
  { image: "/deforestation-trees-cut-down.jpg", label: "Deforestation", category: "nature" },
  { image: "/reforestation-planting-trees-forest.jpg", label: "Reforestation", category: "nature" },
  { image: "/factory-pollution-industrial-smoke.jpg", label: "Factory Pollution", category: "pollution" },
  { image: "/recycling-bins-waste-management.jpg", label: "Recycling", category: "pollution" },
  { image: "/ocean-plastic-pollution-marine-waste.jpg", label: "Ocean Plastic", category: "water" },
  { image: "/clean-water-fresh-water-nature.jpg", label: "Clean Water", category: "water" },
  { image: "/meat-production-livestock-farming.jpg", label: "Meat Production", category: "food" },
  { image: "/plant-based-diet-vegetables-salad.jpg", label: "Plant-Based Diet", category: "food" },
  { image: "/urban-sprawl-city-development.jpg", label: "Urban Sprawl", category: "land" },
  { image: "/green-spaces-parks-nature-city.jpg", label: "Green Spaces", category: "land" },
  { image: "/coal-power-plant-fossil-fuel.jpg", label: "Coal Power", category: "energy" },
  { image: "/placeholder.svg?height=150&width=150", label: "Wind Energy", category: "energy" },
]

const DIFFICULTY_CONFIG = {
  easy: { pairs: 8, timeLimit: 300 },
  medium: { pairs: 12, timeLimit: 600 },
  hard: { pairs: 16, timeLimit: 900 },
}

export default function GameBoard({ difficulty, onGameComplete, onBackToMenu }: GameBoardProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameWon, setGameWon] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [score, setScore] = useState<number>(0)

  const config = DIFFICULTY_CONFIG[difficulty]
  const totalPairs = config.pairs

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [difficulty])

  // Timer
  useEffect(() => {
    if (gameWon) return

    const interval = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [gameWon])

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.category === secondCard.category && firstCard.id !== secondCard.id) {
        // Match found
        setCards((prev) =>
          prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
        )
        setMatchedPairs((prev) => prev + 1)
        setFlippedCards([])
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }

      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  // Check for win and calculate score
  useEffect(() => {
    if (matchedPairs === totalPairs && matchedPairs > 0) {
      setGameWon(true)
      const calculatedScore = calculateScore(moves, time)
      setScore(calculatedScore)
    }
  }, [matchedPairs, totalPairs, moves, time])

  const calculateScore = (finalMoves: number, finalTime: number): number => {
    const baseScore = 1000
    const moveDeduction = finalMoves * 10
    const timeDeduction = finalTime
    const finalScore = Math.max(0, baseScore - moveDeduction - timeDeduction)
    return Math.round(finalScore)
  }

  const initializeGame = () => {
    const selectedCards = CLIMATE_CARDS.slice(0, totalPairs)
    const shuffledCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        image: card.image,
        label: card.label,
        category: card.category,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTime(0)
    setScore(0)
    setGameWon(false)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setCards((prev) => prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card)))
      setFlippedCards((prev) => [...prev, id])
    }
  }

  const gridCols = totalPairs === 8 ? "grid-cols-4" : totalPairs === 12 ? "grid-cols-6" : "grid-cols-8"
  const progressPercentage = (matchedPairs / totalPairs) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🌍 Climate Match - {difficulty.toUpperCase()}</h1>
            <p className="text-sm text-slate-400 mb-3">Match climate problems with sustainable solutions!</p>
            <div className="flex gap-6 text-slate-300">
              <div className="hover:scale-110 transition-transform duration-200">
                <p className="text-sm text-slate-400">Moves</p>
                <p className="text-2xl font-bold text-blue-400">{moves}</p>
              </div>
              <div className="hover:scale-110 transition-transform duration-200">
                <p className="text-sm text-slate-400">Time</p>
                <p className="text-2xl font-bold text-purple-400">{time}s</p>
              </div>
              <div className="hover:scale-110 transition-transform duration-200">
                <p className="text-sm text-slate-400">Matched</p>
                <p className="text-2xl font-bold text-green-400">
                  {matchedPairs}/{totalPairs}
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent transition-all duration-200 hover:scale-105"
          >
            Menu
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-slate-700/50 rounded-full h-2 overflow-hidden border border-slate-600">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Game Board */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 mb-6 shadow-2xl">
          <div className={`grid ${gridCols} gap-4`}>
            {cards.map((card) => (
              <GameCard
                key={card.id}
                id={card.id}
                image={card.image}
                label={card.label}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        </div>

        {/* Win Screen */}
        {gameWon && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-8 text-center mb-6 shadow-lg shadow-green-500/20 animate-pulse">
            <h2 className="text-3xl font-bold text-green-400 mb-2 animate-bounce">You Won! 🌱</h2>
            <p className="text-slate-300 mb-4">
              Great job learning about climate solutions! Score:{" "}
              <span className="font-bold text-green-400">{score}</span> | Moves:{" "}
              <span className="font-bold text-blue-400">{moves}</span> | Time:{" "}
              <span className="font-bold text-purple-400">{time}s</span>
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => onGameComplete(score, moves, time)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
              >
                View Results
              </Button>
              <Button
                onClick={onBackToMenu}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent transition-all duration-200 hover:scale-105"
              >
                Back to Menu
              </Button>
            </div>
          </div>
        )}

        {/* Reset Button */}
        {!gameWon && (
          <Button
            onClick={initializeGame}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 transition-all duration-200 hover:scale-105"
          >
            Reset Game
          </Button>
        )}
      </div>
    </div>
  )
}
