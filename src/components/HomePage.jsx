import axios from "axios";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [responseHome, setResponseHome] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const tokenFromLocalStorage = localStorage.getItem("accessToken");
        const token = tokenFromLocalStorage.substring(
          1,
          tokenFromLocalStorage.length - 1
        );

        axios
          .get("http://localhost:8080/api/home", {
            headers: {
              idToken: token,
            },
          })
          .then((response) => {
            setResponseHome(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Utilizatorul nu este autentificat
        setResponseHome(null);
      }
    });

    // Cleanup: opriți ascultătorul atunci când componenta este demontată
    return () => unsubscribe();
  }, []);

  return <>{responseHome === null ? navigate("/signin") : responseHome}</>;
};
