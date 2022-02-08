import styled from "styled-components";
import PropTypes from "prop-types";
import ROW_STATES from "../constants/RowStates";
import Letter from "./Letter";
import LETTER_STATES from "../constants/LetterStates";

const InnerRow = styled.div`
  display: flex;
  flex-direction: col;
`;

function Row({ state, historyObject }) {
  var { guess, letterStates } = historyObject;

  var letters = [];

  if (state === ROW_STATES.PREVIOUS) {
    letterStates.forEach((state, i) => {
      letters.push(
        <Letter key={i} letter={guess[i]} state={state} />
      );
    })
  } else {
    var guessArray = [...guess.padEnd(5, " ")];
    guessArray.forEach((el, i) => {
      letters.push(
        <Letter key={i} letter={el} state={LETTER_STATES.UNGUESSED} />
      );
    });
  }
  return <InnerRow>{letters}</InnerRow>;
}

Row.propTypes = {
  state: PropTypes.number.isRequired,
  historyObject: PropTypes.shape({
    guess: PropTypes.string,
    letterStates: PropTypes.arrayOf(PropTypes.any)
  }),
};

Row.defaultProps = {
  state: ROW_STATES.UNUSED,
  historyObject: {
    guess: "",
    letterStates: []
  },
};

export default Row;
