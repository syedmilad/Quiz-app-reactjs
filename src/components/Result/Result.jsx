import "../../App.css"
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Result.css';

function Result({result}) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (result <= 30) {
      setMessage("Failed!");
    } else if (result <= 50) {
      setMessage("Pass!");
    } else if (result <= 70) {
      setMessage("Good Job");
    } else if (result >= 70) {
      setMessage("Excelent");
    }
  }, []);

  return (
    <div className="main_div">
      <div className="sub_div_result">
        <div className="result_heading">
          <h1>Result</h1>
          <h2>Completed!</h2>
        </div>
        <div>
          <h2>You Scored: {result}%</h2>
        </div>
        <div className="msg">
          <h2>{message}</h2>
        </div>
        <div className="quit_btn_div">
          <Button variant="contained" className="quit_btn" onClick={()=> navigate("/")}>
            Quit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Result;
