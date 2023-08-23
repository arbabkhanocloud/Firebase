import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handler = () => {
    navigate("auth");
  };
  return (
    <div>
      Home Page
      <button onClick={handler}>go to auth </button>
    </div>
  );
}

export default Home;
