import React from "react";
import "./styles.css";

function TicTacRow({ children, keyVal }) {
  return (
    <div className="row" key={keyVal}>
      {children}
    </div>
  );
}

export default TicTacRow;
