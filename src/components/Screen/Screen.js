import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Screen.css'

const Screen = () => {
  const navigate = useNavigate();
  return (
    <div className="mainBox">
      <div className="subMainBox">
        <div className="instructionHeading">
          <h1>General Quidelines</h1>
        </div>
        <ul className="instructions">
          <li>You will only have 10 seconds per question.</li>
          <li>Once you select your answer, you can't reselect it.</li>
          <li>When time expires, you are unable to select any choice.</li>
          <li>You cannot leave the Quiz once you have begun it.</li>
          <li>You will get point on the basis of your correct answers.</li>
        </ul>
            <div className="instructionsBtn">
                <Button className="btn" onClick={() => navigate('./quiz')} variant="contained">Quiz Start</Button>
            </div>
      </div>
    </div>
  );
};

export default Screen;
