import { createSlice } from "@reduxjs/toolkit";
import sortedWordlist from "../sorted_wordlist.json";
import GAME_STATES from "../constants/GameStates";
import LETTER_STATES from "../constants/LetterStates";

const INITIAL_STATE = {
  currentRow: 0,
  currentGuess: "",
  history: [],
  letterStates: {},
  word: "",
  gameState: GAME_STATES.NEW_GAME,
  tempGuess: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState: INITIAL_STATE,
  reducers: {
    makeGuess: (state) => {
      const { currentGuess, currentRow, gameState } = state;

      var used = [false, false, false, false, false];
      var states = [LETTER_STATES.WRONG, LETTER_STATES.WRONG, LETTER_STATES.WRONG, LETTER_STATES.WRONG, LETTER_STATES.WRONG];
      
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
        state.history.push({
          guess: currentGuess,
          letterStates: [LETTER_STATES.RIGHT_SPACE, LETTER_STATES.RIGHT_SPACE, LETTER_STATES.RIGHT_SPACE, LETTER_STATES.RIGHT_SPACE, LETTER_STATES.RIGHT_SPACE]
        });
      } else if (currentRow === 5) {
        [...currentGuess].forEach((guessLetter, i) => {
          if (guessLetter === state.word[i]) {
            states[i] = LETTER_STATES.RIGHT_SPACE;
            used[i] = true;
          }
        });

        [...state.word].forEach((wordLetter, wordIndex) => {
          [...currentGuess].forEach((guessLetter, guessIndex) => {
            if (wordLetter === guessLetter && !used[wordIndex] && states[guessIndex] === LETTER_STATES.WRONG) {
              states[guessIndex] = LETTER_STATES.RIGHT_LETTER;
              used[wordIndex] = true;
            }
          });
        });

        state.gameState = GAME_STATES.GUESS_MADE;
        state.history.push({
          guess: currentGuess,
          letterStates: states
        });
        state.currentGuess = "";
        state.gameState = GAME_STATES.GAME_LOST;
      } else if (currentGuess.length !== 5) {
        state.gameState = GAME_STATES.INVALID_GUESS_TOO_SHORT;
      } else if (!sortedWordlist[5].includes(currentGuess)) {
        state.gameState = GAME_STATES.INVALID_GUESS_NOT_WORD;
      } else {
        [...currentGuess].forEach((guessLetter, i) => {
          if (guessLetter === state.word[i]) {
            states[i] = LETTER_STATES.RIGHT_SPACE;
            used[i] = true;
          }
        });

        [...state.word].forEach((wordLetter, wordIndex) => {
          [...currentGuess].forEach((guessLetter, guessIndex) => {
            if (wordLetter === guessLetter && !used[wordIndex] && states[guessIndex] === LETTER_STATES.WRONG) {
              states[guessIndex] = LETTER_STATES.RIGHT_LETTER;
              used[wordIndex] = true;
            }
          });
        });

        state.gameState = GAME_STATES.GUESS_MADE;
        state.history.push({
          guess: currentGuess,
          letterStates: states
        });
        state.currentGuess = "";
        state.currentRow += 1;
      }
      if (states) {
        [...currentGuess].forEach((letter, index) => {
          if (!state.letterStates[letter]) {
            state.letterStates[letter] = 0;
          }
          state.letterStates[letter] = Math.max(state.letterStates[letter], states[index]);
        })
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
      const { gameState } = state;
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
      state.letterStates = {};
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
