import axios from "axios";
import React, { useState, useEffect } from "react";

export const HomePage = () => {
  const [responseHome, setResponseHome] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/home")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        setResponseHome(data.message);
      });
  }, []);

  return <>{responseHome}</>;
};
