// Game State
const gameState = {
  currentScreen: "menu",
  round: 1,
  totalRounds: 5,
  score: 0,
  environment: 100,
  health: 100,
  decisions: [],
  gameOver: false,
}

// Game Data - Sustainable Living Choices
const gameCards = [
  {
    id: 1,
    title: "Use Public Transport",
    description: "Take the bus instead of driving your car",
    icon: "🚌",
    impact: 15,
    environment: 20,
    health: 10,
  },
  {
    id: 2,
    title: "Drive Alone",
    description: "Take your personal car for a short trip",
    icon: "🚗",
    impact: -10,
    environment: -15,
    health: -5,
  },
  {
    id: 3,
    title: "Buy Local Produce",
    description: "Shop at farmers market for fresh local food",
    icon: "🥬",
    impact: 12,
    environment: 18,
    health: 15,
  },
  {
    id: 4,
    title: "Order Fast Food",
    description: "Get takeout with excessive packaging",
    icon: "🍔",
    impact: -8,
    environment: -12,
    health: -10,
  },
  {
    id: 5,
    title: "Recycle Properly",
    description: "Sort waste and recycle materials",
    icon: "♻️",
    impact: 10,
    environment: 16,
    health: 5,
  },
  {
    id: 6,
    title: "Throw Away Waste",
    description: "Discard everything in the trash",
    icon: "🗑️",
    impact: -12,
    environment: -20,
    health: -8,
  },
  {
    id: 7,
    title: "Use Renewable Energy",
    description: "Switch to solar or wind power",
    icon: "☀️",
    impact: 18,
    environment: 25,
    health: 8,
  },
  {
    id: 8,
    title: "Leave Lights On",
    description: "Waste electricity throughout the day",
    icon: "💡",
    impact: -6,
    environment: -10,
    health: -3,
  },
  {
    id: 9,
    title: "Plant Trees",
    description: "Participate in reforestation efforts",
    icon: "🌱",
    impact: 20,
    environment: 30,
    health: 12,
  },
  {
    id: 10,
    title: "Ignore Climate News",
    description: "Avoid learning about environmental issues",
    icon: "🙈",
    impact: -5,
    environment: -8,
    health: -5,
  },
]

// Utility Functions
function getRandomCards(count) {
  const shuffled = [...gameCards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function getImpactMessage(impact) {
  if (impact > 15) return "Excellent Choice!"
  if (impact > 5) return "Good Choice"
  if (impact > -5) return "Neutral"
  if (impact > -15) return "Poor Choice"
  return "Harmful Choice"
}

// Render Functions
function renderMenu() {
  const app = document.getElementById("app")
  app.innerHTML = `
        <div class="menu-screen">
            <div class="menu-header">
                <h1 class="game-title">EcoChoice</h1>
                <p class="game-subtitle">Make sustainable decisions and build a better future</p>
            </div>
            
            <div class="menu-buttons">
                <button class="btn btn-primary" onclick="startGame()">Play Game</button>
                <button class="btn btn-secondary" onclick="showInstructions()">How to Play</button>
            </div>
            
            <div class="info-box" id="info-box" style="display: none;">
                <h3>How to Play</h3>
                <p>🎮 Each round, you'll face 3 sustainable living choices.</p>
                <p>🌍 Choose wisely to improve your environment and health scores.</p>
                <p>📊 Complete 5 rounds and see your final impact score.</p>
                <p>🏆 Aim for the highest score possible!</p>
                <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;" onclick="hideInstructions()">Got It!</button>
            </div>
        </div>
    `
}

function renderGame() {
  const app = document.getElementById("app")
  const cards = getRandomCards(3)

  const cardsHTML = cards
    .map((card) => {
      const isNegative = card.impact < 0
      const cardClass = isNegative ? "negative" : card.impact < 10 ? "warning" : ""
      return `
            <div class="card ${cardClass}" onclick="makeChoice(${card.id}, ${card.impact}, ${card.environment}, ${card.health})">
                <div class="card-icon">${card.icon}</div>
                <div class="card-title">${card.title}</div>
                <div class="card-description">${card.description}</div>
                <div class="card-impact">
                    <span class="impact-label">Impact</span>
                    <span class="impact-value">${card.impact > 0 ? "+" : ""}${card.impact}</span>
                </div>
            </div>
        `
    })
    .join("")

  app.innerHTML = `
        <div class="game-screen">
            <div class="game-header">
                <div class="game-title-small">EcoChoice</div>
                <div class="game-stats">
                    <div class="stat">
                        <div class="stat-label">Round</div>
                        <div class="stat-value">${gameState.round}/${gameState.totalRounds}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Score</div>
                        <div class="stat-value">${gameState.score}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Environment</div>
                        <div class="stat-value">${gameState.environment}%</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Health</div>
                        <div class="stat-value">${gameState.health}%</div>
                    </div>
                </div>
            </div>
            
            <div class="game-content">
                <div class="round-info">Choose the most sustainable option</div>
                <div class="card-container">
                    ${cardsHTML}
                </div>
            </div>
        </div>
    `
}

function renderResults() {
  const app = document.getElementById("app")
  const finalScore = gameState.score
  let message = ""

  if (finalScore >= 70) {
    message = "🌟 Outstanding! You're a sustainability champion!"
  } else if (finalScore >= 50) {
    message = "🌱 Great job! You're making a positive impact."
  } else if (finalScore >= 30) {
    message = "💭 Good effort! Keep improving your choices."
  } else {
    message = "🔄 Time to learn more about sustainable living!"
  }

  app.innerHTML = `
        <div class="results-screen">
            <div class="results-container">
                <h2 class="results-title">Game Complete!</h2>
                <div class="final-score">${finalScore}</div>
                
                <div class="results-stats">
                    <div class="result-stat">
                        <div class="result-stat-label">Final Environment</div>
                        <div class="result-stat-value">${gameState.environment}%</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-label">Final Health</div>
                        <div class="result-stat-value">${gameState.health}%</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-label">Decisions Made</div>
                        <div class="result-stat-value">${gameState.decisions.length}</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-label">Rounds Played</div>
                        <div class="result-stat-value">${gameState.totalRounds}</div>
                    </div>
                </div>
                
                <p class="results-message">${message}</p>
                
                <div class="results-buttons">
                    <button class="btn btn-primary" onclick="resetGame()">Play Again</button>
                    <button class="btn btn-secondary" onclick="goToMenu()">Main Menu</button>
                </div>
            </div>
        </div>
    `
}

// Game Logic
function makeChoice(cardId, impact, environment, health) {
  gameState.score += impact
  gameState.environment = clamp(gameState.environment + environment / 10, 0, 100)
  gameState.health = clamp(gameState.health + health / 10, 0, 100)
  gameState.decisions.push(cardId)

  gameState.round++

  if (gameState.round > gameState.totalRounds) {
    gameState.currentScreen = "results"
    renderResults()
  } else {
    renderGame()
  }
}

function startGame() {
  gameState.round = 1
  gameState.score = 0
  gameState.environment = 100
  gameState.health = 100
  gameState.decisions = []
  gameState.currentScreen = "game"
  renderGame()
}

function resetGame() {
  startGame()
}

function goToMenu() {
  gameState.currentScreen = "menu"
  renderMenu()
}

function showInstructions() {
  const infoBox = document.getElementById("info-box")
  infoBox.style.display = "block"
}

function hideInstructions() {
  const infoBox = document.getElementById("info-box")
  infoBox.style.display = "none"
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderMenu()
})
