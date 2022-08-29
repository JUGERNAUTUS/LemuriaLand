import React from "react";
import { useNavigate } from "react-router-dom";

function Lemuriatoday(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="box backbutton is-overlay is-info mobile-secondmap-back-button switchbutton ">
        <a className="button  " onClick={() => navigate("/")}>
          Back to Lemuria
        </a>
      </div>
      <img className="lemuriatoday" src="/images/lemuriatoday.png"></img>
    </>
  );
}

export default Lemuriatoday;
