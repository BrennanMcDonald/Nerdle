import { createSlice } from "@reduxjs/toolkit";
import sortedWordlist from "../sorted_wordlist.json";
import GAME_STATES from "../constants/GameStates";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentRow: 0,
    currentGuess: "",
    history: [],
    word: "",
    gameState: GAME_STATES.NEW_GAME,
    tempGuess: "",
  },
  reducers: {
    makeGuess: (state) => {
      const { currentGuess, currentRow, gameState } = state;
      state.tempGuess = currentGuess;
      if (
        gameState === GAME_STATES.GAME_WON ||
        gameState === GAME_STATES.GAME_LOST
      ) {
        return;
      }

      if (currentGuess === state.word) {
        state.gameState = GAME_STATES.GAME_WON;
        state.currentRow += 1;
        state.currentGuess = "";
        state.history.push(currentGuess);
      } else if (currentRow === 5) {
        state.gameState = GAME_STATES.GAME_LOST;
      } else if (currentGuess.length !== 5) {
        state.gameState = GAME_STATES.INVALID_GUESS_TOO_SHORT;
      } else if (!sortedWordlist[5].includes(currentGuess)) {
        state.gameState = GAME_STATES.INVALID_GUESS_NOT_WORD;
      } else {
        state.gameState = GAME_STATES.GUESS_MADE;
        state.history.push(currentGuess);
        state.currentGuess = "";
        state.currentRow += 1;
      }
    },
    addLetter: (state, { payload }) => {
      const { gameState } = state;

      if (
        gameState !== GAME_STATES.GAME_WON &&
        gameState !== GAME_STATES.GAME_LOST
      ) {
        if ((state.currentGuess + payload).length <= 5) {
          state.currentGuess = state.currentGuess + payload;
        }
      } else {
        return;
      }
    },
    removeLetter: (state) => {

      if (
        gameState !== GAME_STATES.GAME_WON &&
        gameState !== GAME_STATES.GAME_LOST
      ) {
        state.currentGuess = state.currentGuess.substr(
          0,
          state.currentGuess.length - 1
        );
      } else {
        return;
      }
    },
    clearCurrentGuess: (state) => {
      state.currentGuess += "";
    },
    newGame: (state, { payload }) => {
      var newWordIndex = Math.floor(
        Math.random() * sortedWordlist[payload.toString()].length
      );

      state.word = sortedWordlist[payload.toString()][newWordIndex];
      state.currentRow = 0;
      state.currentGuess = "";
      state.history = [];
      state.gameState = GAME_STATES.NEW_GAME;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  makeGuess,
  addLetter,
  removeLetter,
  clearCurrentGuess,
  newGame,
} = gameSlice.actions;

export default gameSlice.reducer;
