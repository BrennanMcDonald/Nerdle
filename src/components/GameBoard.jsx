import styled from "styled-components";
import PropTypes from "prop-types";
import Row from "./Row";

import { useSelector } from "react-redux";
import ROW_STATES from "../constants/RowStates";
import GAME_STATES from "../constants/GameStates";

const Game = styled.div`
  flex: 1;
`;

function renderGameBoard(word, gameState, currentRow, history, currentGuess) {
  if (gameState === GAME_STATES.GAME_LOST) {
    return (
      <Game>
        {[...Array(word.length + 1).keys()].map((el, i) => {
          return (
            <Row
              key={el}
              state={ROW_STATES.PREVIOUS}
              historyObject={history[i]}
            />
          );
        })}
      </Game>
    )
  } else {
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
              historyObject={
                currentRow === i ? { guess: currentGuess, letterStates: [] } : currentRow < i ? { guess: "", letterStates: [] } : history[i]
              }
            />
          );
        })}
      </Game>
    )
  }
}

function GameBoard({ word, currentGuess }) {
  const currentRow = useSelector((state) => state.game.currentRow);
  const history = useSelector((state) => state.game.history);
  const gameState = useSelector((state) => state.game.gameState);

  return renderGameBoard(word, gameState, currentRow, history, currentGuess)
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
