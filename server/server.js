import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup-auth-react",
});

// login api 1.
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ? ";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: "SERVER SIDE error in login api" });
    if (data.length > 0) {
      const name = data[0].name;
      const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Message: "No record exists" });
    }
  });
});

// home page when logged in

// protected route
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "We need token please provide it . Login Now" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({
          Message: "Authentication error",
        });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  const token = req.cookies.token;

  return res.json({ Status: "Success", name: req.name });
});

// logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen(8081, () => {
  console.log("Listening ... ");
});
