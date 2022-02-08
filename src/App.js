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
import LETTER_STATES from "./constants/LetterStates";

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  text-align: center;
  color: white;
  border-bottom: solid 1px white;
  padding-left: 100px;
  padding-right: 100px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const GameMessage = styled.div`
  font-weight: 700;
  font-size: 1em;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  text-align: center;
  color: white;
  border-bottom: solid 1px white;
  padding-left: 100px;
  padding-right: 100px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const TitleButton = styled.button`
  position: absolute;
  right: 0px;
  background: transparent;
  color: white;
  border: solid 1px white;
  position-self: center;
  padding: 5px;
  cursor: pointer;
`;

const Header = styled.div`
`;

const KeyboardWrapper = styled.div`
  max-width: 650px;
  flex: 0;
  margin-top: auto;
  width: 50%;
  bottom:50px;
  @media screen and (max-width: 768px) {
      width: 100%;
      bottom:0px;
  }
`

function App() {
  const dispatch = useDispatch();
  const word = useSelector((state) => state.game.word);

  const currentGuess = useSelector((state) => state.game.currentGuess);
  const currentRow = useSelector((state) => state.game.currentRow);
  const gameState = useSelector((state) => state.game.gameState);
  const tempGuess = useSelector((state) => state.game.tempGuess);
  const letterStates = useSelector((state) => state.game.letterStates);

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
      case GAME_STATES.GAME_LOST:
        return `You Lost. The correct word was ${word} :(`;
      case GAME_STATES.INVALID_GUESS_NOT_WORD:
        return `${tempGuess} is not in the Nerdle wordbank`;
      case GAME_STATES.INVALID_GUESS_TOO_SHORT:
        return `Guess is too short.`;
      default:
        return ``;
    }
  };

  if (keyboardRef.current) {
    const keys = keyboardRef.current.getElementsByClassName("hg-button");
    for(var i = 0; i < keys.length; i++) {
      var letter = keys[i].dataset["skbtn"].toLowerCase();
      if (letterStates[letter] === LETTER_STATES.RIGHT_LETTER) {
        keys[i].style.background = "rgb(181, 159, 59)";
      } else if(letterStates[letter] === LETTER_STATES.RIGHT_SPACE) {
        keys[i].style.background = "rgb(83, 141, 78)";
      } else if(letterStates[letter] === LETTER_STATES.WRONG) {
        keys[i].style.background = "rgb(134, 136, 138)";
      } else if(Object.keys(letterStates).length === 0) {
        keys[i].style.background = "rgb(255,255,255)";
      }
    }
  }

  return (
    <div className="App">
      <Header>
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
      </Header>
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
