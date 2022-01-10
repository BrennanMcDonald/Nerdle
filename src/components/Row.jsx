import { useSelector } from "react-redux";

import styled from "styled-components";
import PropTypes from "prop-types";
import ROW_STATES from "../constants/RowStates";
import Letter from "./Letter";
import LETTER_STATES from "../constants/LetterStates";

const InnerRow = styled.div`
  display: flex;
  flex-direction: col;
`;

function Row({ state, guess }) {
  var currentWord = [...useSelector((state) => state.game.word)];
  var guessArray = [...guess.padEnd(5, " ")];
  var letters = [];
  var states = [LETTER_STATES.WRONG, LETTER_STATES.WRONG, LETTER_STATES.WRONG, LETTER_STATES.WRONG, LETTER_STATES.WRONG];
  var used = [false, false, false, false, false];

  if (state === ROW_STATES.PREVIOUS) {
    // Check for letters that are in the correct spot
    guessArray.forEach((guessLetter, i) => {
      if (guessLetter === currentWord[i]) {
        states[i] = LETTER_STATES.RIGHT_SPACE;
        used[i] = true;
      }
    });

    // Find letters that occur, but not in the right spot
    // Algorithm:
    // for each letter in the word
    //    for each letter in the guess
    //      if the letters match, we know there is overlap
    //      ensure we haven't already found a match for that character in the word
    //      Save the state and mark the letter in the word a used.
    currentWord.forEach((wordLetter, wordIndex) => {
      guessArray.forEach((guessLetter, guessIndex) => {
        if (wordLetter === guessLetter && !used[wordIndex] && states[guessIndex] === LETTER_STATES.WRONG) {
          states[guessIndex] = LETTER_STATES.RIGHT_LETTER;
          used[wordIndex] = true;
        }
      });
    });

    states.forEach((state, i) => {
      letters.push(
        <Letter key={i} letter={guessArray[i]} state={state} />
      );
    })

  } else {
    guessArray.forEach((el, i) => {
      letters.push(
        <Letter key={i} letter={el} state={LETTER_STATES.UNGUESSED} />
      );
    });
  }
  console.log(letters);

  return <InnerRow>{letters}</InnerRow>;
}

Row.propTypes = {
  state: PropTypes.number.isRequired,
  guess: PropTypes.string.isRequired,
};

Row.defaultProps = {
  state: ROW_STATES.UNUSED,
  guess: "",
};

export default Row;
