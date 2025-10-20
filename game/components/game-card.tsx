"use client"

interface GameCardProps {
  id: number
  image: string
  label: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
}

export default function GameCard({ id, image, label, isFlipped, isMatched, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isFlipped || isMatched}
      className="relative w-full aspect-square perspective transition-transform duration-300 hover:scale-105 disabled:hover:scale-100 group"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-gpu ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        } ${isMatched ? "animate-pulse" : ""}`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-lg flex items-center justify-center font-bold text-2xl text-white shadow-lg border border-green-400 group-hover:shadow-green-500/50 group-hover:shadow-xl transition-shadow duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="group-hover:scale-110 transition-transform duration-300">🌍</span>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full rounded-lg flex flex-col items-center justify-between font-bold shadow-lg border-2 transition-all duration-300 p-2 overflow-hidden ${
            isMatched
              ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-green-500/50 shadow-xl"
              : "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:shadow-green-500/50 hover:shadow-lg"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={label}
            className={`w-full h-4/5 object-cover rounded-md ${isMatched ? "animate-bounce" : ""}`}
          />
          <span className="text-xs text-center leading-tight text-slate-200 line-clamp-1 font-semibold mt-1">
            {label}
          </span>
        </div>
      </div>

      {/* Match Particle Effect */}
      {isMatched && (
        <>
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/50 to-green-400/0 animate-pulse"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-8 h-8 border-2 border-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </>
      )}
    </button>
  )
}
