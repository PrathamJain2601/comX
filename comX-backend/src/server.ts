const express = require('express');
const cors = require('cors');
import {Response, Request, urlencoded} from "express";
// require('global-agent/bootstrap');
// process.env.GLOBAL_AGENT_HTTP_PROXY = 'http://172.31.2.3:8080';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
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

app.listen(5000, ()=>{
    console.log("server running on port 5000");
});