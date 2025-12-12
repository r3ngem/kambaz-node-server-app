import express from 'express';
import mongoose from "mongoose";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from './Kambaz/Modules/routes.js';
import AssignmentsRoutes from './Kambaz/Assignments/routes.js';
import "dotenv/config";
import session from "express-session";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb+srv://rengem:Va05beach@kambaz.c9tatn7.mongodb.net/?appName=Kambaz"
mongoose.connect(CONNECTION_STRING);
mongoose.connection.on('connected', () => {
  console.log("Mongoose connected to:", mongoose.connection.name);
});

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || "https://kambaz-next-js-r3ngem.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.SERVER_ENV !== "development",
    httpOnly: true,
    sameSite: process.env.SERVER_ENV !== "development" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24
  }
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = process.env.SERVER_URL;
}

app.use(session(sessionOptions));
app.use(express.json());  
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
Lab5(app)
Hello(app)
app.listen(process.env.PORT || 4000)