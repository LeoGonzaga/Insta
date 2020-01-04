import React from "react";
import Logo from "../assets/instagram-1.svg";
import Icon from "../assets/logo.png";
import "../styles/Header.css";
import Button from "@material-ui/core/Button";

export default function Header() {
  return (
    <div>
      <div className="navbar">
        <img src={Logo} alt="Logo" height="40" />
        <Button variant="contained" color="primary">
          Olá Mundo
        </Button>
      </div>
      <div className="feed"></div>
    </div>
  );
}
