import React from "react";
import "./styles.css";

function TicTacBox({ handleBox, keyVal }) {
  return <div className="box" onClick={handleBox} key={keyVal}></div>;
}

export default TicTacBox;
