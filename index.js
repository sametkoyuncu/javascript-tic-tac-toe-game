const winningConditions = [
  ['012'],
  ['345'],
  ['678'],
  ['036'],
  ['147'],
  ['258'],
  ['048'],
  ['246'],
]

const players = {
  X: { name: 'X', class: 'cell-has-value-x', cells: [] },
  O: { name: 'O', class: 'cell-has-value-o', cells: [] },
}

// variables
let currentPlayer = players.X
let stepCounter = 0
const scores = {
  X: 0,
  O: 0,
}
const INITIAL_PARAGRAPH =
  'Player <span class="player-name">X</span> will start the game.'

// elements

// buttons
const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')
const playAgainBtn = document.querySelector('#playAgainBtn')

// divs
const endGame = document.querySelector('.endGame')
const gameSection = document.querySelector('.gameSection')
const cells = document.querySelectorAll('.cell')

// table rows
const scoreX = document.getElementById('scoreX')
const scoreO = document.getElementById('scoreO')

// paragraphs
const winnerParagraph = document.querySelector('.winner')
const currentPlayerParagraph = document.getElementById('currentPlayerParagraph')

currentPlayerParagraph.innerHTML = INITIAL_PARAGRAPH

/* ###### functions ###### */
// set current player
const setCurrentPlayer = () =>
  currentPlayer.name == players.X.name
    ? (currentPlayer = players.O)
    : (currentPlayer = players.X)

// clear old data
const clearOldData = () => {
  // clear cells
  cells.forEach((cell) => {
    cell.classList.add('cell')
    cell.classList.remove(players.X.class)
    cell.classList.remove(players.O.class)
    cell.innerHTML = ''
  })
  // clear player cells
  players.X.cells = []
  players.O.cells = []
  // reset step counter and current player
  currentPlayer = players.X
  stepCounter = 0
  currentPlayerParagraph.innerHTML = INITIAL_PARAGRAPH
}

// play game
const playGame = () => {
  gameSection.classList.remove('hidden')
  startBtn.classList.add('hidden')
  endGame.classList.add('hidden')

  clearOldData()
}

// new game function
const newGameAndClearScores = () => {
  playGame()
  scores.X = 0
  scores.O = 0
}

// start and restart btn click
startBtn.addEventListener('click', () => newGameAndClearScores())

restartBtn.addEventListener('click', () => newGameAndClearScores())

// play again
playAgainBtn.addEventListener('click', () => playGame())
console.log(playAgainBtn)

// game over with winner
const gameOverWithWinner = (winner) => {
  winnerParagraph.innerHTML = `<span class="player-name">${winner.name}</span> won!`

  gameOverClasses()

  winner.name == players.X.name ? (scores.X += 1) : (scores.O += 1)

  scoreX.innerHTML = scores.X
  scoreO.innerHTML = scores.O
}

// game over with out winner
const gameOverWithOutWinner = () => {
  winnerParagraph.innerHTML = 'No winner!'
  gameOverClasses()
}

// Adding and removing classes when the game is over.
const gameOverClasses = () => {
  gameSection.classList.add('hidden')
  startBtn.classList.remove('hidden')
  endGame.classList.remove('hidden')
}

// check for winner
const checkForWinner = () => {
  if (stepCounter == 8) {
    gameOverWithOutWinner()
    return true
  }
  stepCounter++

  winningConditions.forEach((condition) => {
    if (currentPlayer.cells.sort().join('').includes(condition)) {
      gameOverWithWinner(currentPlayer)
    }
  })
}

// handle cell click
const handleCellClick = (id) => () => {
  const cell = document.getElementById(id)
  if (
    cell.classList.contains('cell-has-value-x') ||
    cell.classList.contains('cell-has-value-o')
  ) {
    return
  }
  cell.classList.add(currentPlayer.class)
  cell.classList.remove('cell')
  currentPlayer.cells.push(id)
  cell.innerHTML = currentPlayer.name

  checkForWinner()
  setCurrentPlayer()
  currentPlayerParagraph.innerHTML = `Player <span class="player-name">${currentPlayer.name}</span> turn.`
}

// add event listener to cells
cells.forEach((cell) =>
  cell.addEventListener('click', handleCellClick(cell.id))
)
