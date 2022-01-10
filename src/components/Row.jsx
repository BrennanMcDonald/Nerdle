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
  const currentWord = useSelector((state) => state.game.word);
  guess = guess.padEnd(5, " ");

  var letters = [];
  // We need to build colors
  if (state === ROW_STATES.PREVIOUS) {
    [...guess].forEach((el, i) => {
      if (el === currentWord[i]) {
        letters.push(
          <Letter key={i} letter={el} state={LETTER_STATES.RIGHT_SPACE} />
        );
      } else if (currentWord.includes(el)) {
        letters.push(
          <Letter key={i} letter={el} state={LETTER_STATES.RIGHT_LETTER} />
        );
      } else {
        letters.push(
          <Letter key={i} letter={el} state={LETTER_STATES.WRONG} />
        );
      }
    });
  } else {
    [...guess].forEach((el, i) => {
      letters.push(
        <Letter key={i} letter={el} state={LETTER_STATES.UNGUESSED} />
      );
    });
  }

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
