const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { server: WebSocketServer } = require('websocket');
import {Response, Request} from "express";
import { Message, request } from "websocket";

const app = express();

const webSocket = express();
const wsServer = http.createServer(webSocket);
const ws = new WebSocketServer({
    httpServer: wsServer,
    autoAcceptConnections: false,
  });

app.use(express.json());
app.use(cookieParser());
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


ws.on('request', (request: request) => {
    const connection = request.accept(null, request.origin);
    console.log('WebSocket connection established on app2.');
  
    // Handle incoming messages
    connection.on('message', (message: Message) => {
      if (message.type === 'utf8') {
        console.log(`App2 received: ${message.utf8Data}`);
        connection.sendUTF(`App2 echo: ${message.utf8Data}`);
      }
    });
  
    // Handle connection close
    connection.on('close', (reasonCode: number, description: string) => {
      console.log('WebSocket connection closed on app2.');
    });
  });

app.listen(5000, ()=>{
    console.log("server running on port 5000");
});

const WS_PORT = 5001;
wsServer.listen(WS_PORT, () => {
  console.log(`WebSocket server running on port ${WS_PORT}`);
});