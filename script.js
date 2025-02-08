"use strict";
//variables
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const scorePlayer0 = document.getElementById("score--0");
const scorePlayer1 = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
//starting points and etc
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
//functions
const getActivePlayer = (a) => {
  return a === 1 ? player1El : player0El;
};
const getCurrentScoreOfActivePlayer = (i) => {
  let active = document.getElementById(`current--${i}`);
  return active;
};
const toggleActiveClass = () => {
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};
const getCurrentScoreActivePlayer = (x) => {
  let currentScoreActivePlayer = document.getElementById(`current--${x}`);
  return Number(currentScoreActivePlayer.textContent);
};
const totalScorePlayerActive = (y) => {
  let scorePlayerActive = document.getElementById(`score--${y}`);
  return Number(scorePlayerActive.textContent);
};
//EVENTS
//for roll dice btn
rollBtn.addEventListener("click", () => {
  //dice and its image
  const dice = Math.trunc(Math.random() * 6 + 1);
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove("hidden");
  //put the dice into active player score

  if (dice !== 1) {
    //adding the dice point to the active player
    currentScore += dice;
    getCurrentScoreOfActivePlayer(activePlayer).textContent = currentScore;
  } else {
    //setting current score for prev active player to 0
    getCurrentScoreOfActivePlayer(activePlayer).textContent = 0;
    //switch active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    toggleActiveClass();
  }
});
//for hold button
holdBtn.addEventListener("click", () => {
  //save the current to total for active player
  let totalScore =
    totalScorePlayerActive(activePlayer) +
    getCurrentScoreActivePlayer(activePlayer);
  //get the current score for active player
  document.getElementById(`score--${activePlayer}`).textContent = totalScore;
  //win condition is to be active and be above or equal to 50
  if (totalScore >= 50) {
    getActivePlayer(activePlayer).classList.add("player--winner");
    rollBtn.disabled = true;
    holdBtn.disabled = true;
  }
  //set the current for active player to 0
  getCurrentScoreOfActivePlayer(activePlayer).textContent = 0;
  //switch the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  toggleActiveClass();
});
//new game btn
newBtn.addEventListener("click", () => {
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  getActivePlayer(activePlayer).classList.remove("player--winner");
  rollBtn.disabled = false;
  holdBtn.disabled = false;
  currentScore = 0;
  activePlayer = 0;
  if (player1El.classList.contains("player-active")) {
    toggleActiveClass();
  }
});
