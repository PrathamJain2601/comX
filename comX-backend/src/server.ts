import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';

// ─── Express App Setup ──────────────────────────────
const app = express();
const server = http.createServer(app); // ✅ shared server
const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://comx-frontend.vercel.app'],
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  },
});

// ─── Middleware ─────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'https://comx-frontend.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// ─── Routes ─────────────────────────────────────────
app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

app.use('/auth', require('./routes/auth.route'));
app.use('/community', require('./routes/community.route'));
app.use('/member', require('./routes/member.route'));
app.use('/calendar', require('./routes/calendar.route'));
app.use('/project', require('./routes/project.route'));
app.use('/task', require('./routes/tasks.route'));
app.use('/user', require('./routes/user.route'));

// ─── Prisma & WebSocket ─────────────────────────────
const prisma = new PrismaClient();

async function isUserInProject(userId: number, projectId: number): Promise<boolean> {
  const membership = await prisma.projectMembers.findFirst({
    where: { userId, projectId },
  });
  return membership !== null;
}

io.on('connect', (socket) => {
  console.log('A user connected to WebSocket server');

  socket.on('joinRoom', async (room: string, userId: number) => {
    const projectId = parseInt(room);
    if (await isUserInProject(userId, projectId)) {
      socket.join(room);
      console.log(`User ${userId} joined room: ${room}`);
      socket.emit('joinSuccess', `Joined room ${room}`);
    } else {
      socket.emit('error', { message: 'Unauthorized: You are not a member of this project.' });
    }
  });

  socket.on('fetchMessages', async (room: string, userId: number, offset: number) => {
    const projectId = parseInt(room);
    if (await isUserInProject(userId, projectId)) {
      try {
        const messages = await prisma.message.findMany({
          where: { projectId },
          orderBy: { createdAt: 'desc' },
          skip: offset * 40,
          take: 40,
        });
        socket.emit('receiveMessages', messages.reverse());
      } catch (error) {
        console.error('Error fetching messages:', error);
        socket.emit('error', { message: 'Could not retrieve messages' });
      }
    } else {
      socket.emit('error', { message: 'Unauthorized: You are not a member of this project.' });
    }
  });

  socket.on('message', async (data) => {
    const { room, content, userId } = data;
    const projectId = parseInt(room);
    if (await isUserInProject(userId, projectId)) {
      try {
        const message = await prisma.message.create({
          data: {
            content,
            senderId: userId,
            projectId,
            createdAt: new Date(),
          },
        });
        io.to(room).emit('message', message);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    } else {
      socket.emit('error', { message: 'Unauthorized: You are not a member of this project.' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from WebSocket server');
  });
});

// ─── Start Server ───────────────────────────────────
const PORT = parseInt(process.env.PORT || '3000', 10);
server.listen(PORT, () => {
  console.log(`Server + WebSocket running on port ${PORT}`);
});
