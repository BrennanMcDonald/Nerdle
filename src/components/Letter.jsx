import styled from "styled-components";
import PropTypes from "prop-types";
import LETTER_STATES from "../constants/LetterStates";

const LetterInner = styled.div`
  border: solid 1px #d8d8d8;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;

  color: white;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  align-items: center;
`;

const colors = {
  [LETTER_STATES.RIGHT_LETTER]: "#b59f3b",
  [LETTER_STATES.RIGHT_SPACE]: "#538d4e",
  [LETTER_STATES.UNGUESSED]: "transparent",
  [LETTER_STATES.WRONG]: "#86888a",
};

function Letter({ letter, state }) {
  return (
    <LetterInner style={{ backgroundColor: colors[state] }}>
      {letter}
    </LetterInner>
  );
}

Letter.propTypes = {
  letter: PropTypes.string,
  state: PropTypes.number.isRequired,
};

Letter.defaultProps = {
  state: LETTER_STATES.UNGUESSED,
};

export default Letter;
