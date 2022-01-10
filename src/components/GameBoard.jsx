import styled from "styled-components";
import PropTypes from "prop-types";
import Row from "./Row";

import { useSelector } from "react-redux";
import ROW_STATES from "../constants/RowStates";

const Game = styled.div`
  flex: 1;
`;

function GameBoard({ word, currentGuess }) {
  const currentRow = useSelector((state) => state.game.currentRow);
  const history = useSelector((state) => state.game.history);

  return (
    <Game>
      {[...Array(word.length + 1).keys()].map((el, i) => {
        return (
          <Row
            key={el}
            state={
              currentRow === i
                ? ROW_STATES.ACTIVE
                : currentRow < i
                ? ROW_STATES.UNUSED
                : ROW_STATES.PREVIOUS
            }
            guess={
              currentRow === i ? currentGuess : currentRow < i ? "" : history[i]
            }
          />
        );
      })}
    </Game>
  );
}

GameBoard.propTypes = {
  word: PropTypes.string,
  currentGuess: PropTypes.string,
};

GameBoard.defaultProps = {
  word: "",
  currentGuess: "",
};

export default GameBoard;
