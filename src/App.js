import "./App.css";
import "react-simple-keyboard/build/css/index.css";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeGuess, newGame, addLetter, removeLetter } from "./redux/gameSlice";

import Keyboard from "react-simple-keyboard";
import CustomLayout from "./constants/KeyboardLayouts";

import GameBoard from "./components/GameBoard";
import GAME_STATES from "./constants/GameStates";
import styled from "styled-components";

const KeyboardWrapper = styled.div`
  width: 50%;
  bottom: 50px;
  position:absolute;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  text-align: center;
  color:white;
  border-bottom: solid 1px white;
  padding-left: 100px;
  padding-right: 100px;
  margin-bottom:10px;
  position:relative;
  display:flex;
  align-items: center;
`;

const GameMessage = styled.div`
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  text-align: center;
  color:white;
  border-bottom: solid 1px white;
  padding-left: 100px;
  padding-right: 100px;
  margin-bottom:10px;
  position:relative;
  display:flex;
  align-items: center;
`;

const TitleButton = styled.button`
  position: absolute;
  right:0px;
  background: transparent;
  color: white;
  border: solid 1px white;
  position-self:center;
  padding: 5px;
  cursor: pointer;
`;

function App() {
  const dispatch = useDispatch();
  const word = useSelector((state) => state.game.word);

  const currentGuess = useSelector((state) => state.game.currentGuess);
  const currentRow = useSelector((state) => state.game.currentRow);
  const gameState = useSelector((state) => state.game.gameState);
  const tempGuess = useSelector((state) => state.game.tempGuess);

  const keyboardRef = useRef();

  useEffect(() => {
    dispatch(newGame(5));
  }, [dispatch]);

  const onKeyPress = (button) => {
    if (button === "{bksp}") {
      dispatch(removeLetter());
    } else if (button === "{accept}") {
      dispatch(makeGuess());
    } else {
      dispatch(addLetter(button));
    }
  };

  const renderGameMessage = () => {
    switch (gameState) {
      case GAME_STATES.GAME_WON:
        return `Congratulations! You got it in ${currentRow} guess${
          currentRow === 1 ? "" : "es"
        }`;
        case GAME_STATES.GAME_OVER:
          return `You Lost. Sadge.`;
      case GAME_STATES.INVALID_GUESS_NOT_WORD:
        return `${tempGuess} is not a word, bozo.`;
      case GAME_STATES.INVALID_GUESS_TOO_SHORT:
        return `Guess is too short.`;
      default:
        return "";
    }
  };

  return (
    <div className="App">
      <Title>
        NERDLE
      <TitleButton
        onClick={() => {
          dispatch(newGame(5));
        }}
      >
        New
      </TitleButton>
      </Title>
      <br />
      <GameMessage>{renderGameMessage()}</GameMessage>
      <GameBoard
        word={word}
        currentGuess={currentGuess}
        gameState={gameState}
      />
      <KeyboardWrapper ref={keyboardRef}>
        <Keyboard layout={CustomLayout} onKeyPress={onKeyPress} />
      </KeyboardWrapper>
    </div>
  );
}

export default App;
