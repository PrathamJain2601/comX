const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
import {Response, Request} from "express";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));;
const corsOptions = {
    origin: 'http://localhost:5173',   // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
  
  // Use CORS middleware
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response)=>{
    res.send("server is running");
})

const auth = require("./routes/auth.route");
app.use("/auth", auth);
const community = require("./routes/community.route");
app.use("/community", community);
const member = require("./routes/member.route");
app.use("/member", member);
const calendar = require("./routes/calendar.route");
app.use("/calendar", calendar);
const project = require("./routes/project.route");
app.use("/project", project);
const task = require("./routes/tasks.route");
app.use("/task", task);
const user = require("./routes/user.route");
app.use("/user", user);


app.listen(5000, ()=>{
    console.log("server running on port 5000");
});