import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081").then((res) => {
      console.log(res);
      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        alert(setMessage(res.data.Message));
      }
    });
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          // window.reload(true);
          window.location.reload(true);
          console.log(res.data);
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h3>You are Authorized {name}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
