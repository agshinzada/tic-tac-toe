import TicTacBox from "./components/TicTacBox";
import TicTacRow from "./components/TicTacRow";
import "./App.css";
import { useEffect, useRef, useState } from "react";

let arr = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [circleUser, setCircleUser] = useState(false);
  const [xUser, setXUser] = useState(false);
  const [lock, setLock] = useState(true);
  const [currentUser, setCurrentUser] = useState(circleUser);
  const refStatus = useRef();
  const boardRef = useRef();

  function handleBox(e, num) {
    if (lock) {
      return 0;
    }

    if (currentUser === circleUser) {
      arr[num] = currentUser;
      e.target.innerHTML = `
      <img src="/circle.png" alt="x" className="box-img" />
      `;
      if (checkWin()) {
        setLock(true);
        alert(`Winner: ${currentUser}`);
      }
      setCurrentUser(xUser);
    } else if (currentUser === xUser) {
      arr[num] = currentUser;
      e.target.innerHTML = `
      <img src="/x.png" alt="x" className="box-img" />
      `;
      if (checkWin()) {
        setLock(true);
        alert(`Winner: ${currentUser}`);
      }
      setCurrentUser(circleUser);
    }
  }

  function checkWin() {
    if (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] !== "") {
      return true;
    } else if (arr[3] === arr[4] && arr[4] === arr[5] && arr[5] !== "") {
      return true;
    } else if (arr[6] === arr[7] && arr[7] === arr[8] && arr[8] !== "") {
      return true;
    } else if (arr[0] === arr[3] && arr[3] === arr[6] && arr[6] !== "") {
      return true;
    } else if (arr[1] === arr[4] && arr[4] === arr[7] && arr[7] !== "") {
      return true;
    } else if (arr[2] === arr[5] && arr[5] === arr[8] && arr[8] !== "") {
      return true;
    } else if (arr[0] === arr[4] && arr[4] === arr[8] && arr[8] !== "") {
      return true;
    } else if (arr[2] === arr[4] && arr[4] === arr[6] && arr[6] !== "") {
      return true;
    }
    return false;
  }

  function startGame() {
    try {
      if (lock) {
        setLock(false);
        setCurrentUser(circleUser);
      } else {
        alert("Please reset board!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function resetGame() {
    try {
      for (let i = 0; i < boardRef.current.children.length; i++) {
        for (let m = 0; m < boardRef.current.children[i].children.length; m++) {
          boardRef.current.children[i].children[m].innerHTML = "";
        }
      }
      arr = ["", "", "", "", "", "", "", "", ""];
      setLock(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      refStatus.current.innerHTML = `
      Turn: ${currentUser}
      `;
    }
  }, [currentUser]);

  return (
    <div className="app">
      <header>
        <div className="header">
          <h1>Tic Tac Toe Game in React</h1>
          <div className="start-box">
            <div className="input-box">
              <img src="/circle.png" alt="circle" className="head-img" />
              <input
                type="text"
                placeholder="Your name"
                onChange={(e) =>
                  setCircleUser(e.target.value === "" ? false : e.target.value)
                }
              />
            </div>
            <div className="input-box">
              <img src="/x.png" alt="x" className="head-img" />
              <input
                type="text"
                placeholder="Your name"
                onChange={(e) =>
                  setXUser(e.target.value === "" ? false : e.target.value)
                }
              />
            </div>
          </div>
          <button
            type="button"
            disabled={circleUser && xUser ? false : true}
            onClick={startGame}
            className="btn btn-start"
          >
            Start
          </button>
          <div className="display-user" ref={refStatus}></div>
        </div>
      </header>

      <main>
        <div className="board" ref={boardRef}>
          <TicTacRow keyVal={1}>
            <TicTacBox handleBox={(e) => handleBox(e, 0)} keyVal={0} />
            <TicTacBox handleBox={(e) => handleBox(e, 1)} keyVal={1} />
            <TicTacBox handleBox={(e) => handleBox(e, 2)} keyVal={2} />
          </TicTacRow>
          <TicTacRow keyVal={2}>
            <TicTacBox handleBox={(e) => handleBox(e, 3)} keyVal={3} />
            <TicTacBox handleBox={(e) => handleBox(e, 4)} keyVal={4} />
            <TicTacBox handleBox={(e) => handleBox(e, 5)} keyVal={5} />
          </TicTacRow>
          <TicTacRow keyVal={3}>
            <TicTacBox handleBox={(e) => handleBox(e, 6)} keyVal={6} />
            <TicTacBox handleBox={(e) => handleBox(e, 7)} keyVal={7} />
            <TicTacBox handleBox={(e) => handleBox(e, 8)} keyVal={8} />
          </TicTacRow>
          <button type="button" onClick={resetGame} className="btn btn-reset">
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
