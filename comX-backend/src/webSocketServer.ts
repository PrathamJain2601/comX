// Prisma and Socket.IO setup
import { PrismaClient } from '@prisma/client';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const prisma = new PrismaClient();
const webSocketApp = express();
const server = createServer(webSocketApp);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  },
});

async function isUserInProject(userId: number, projectId: number): Promise<boolean> {
    const membership = await prisma.projectMembers.findFirst({
      where: {
        userId: userId,
        projectId: projectId,
      },
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
          where: { projectId: Number(projectId) },
          orderBy: { createdAt: 'desc' },
          skip: offset*40,
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
            projectId: Number(projectId),
            createdAt: new Date(),
          },
        });
        io.to(room).emit('message', message);
      } catch (error) {
        console.error('Error saving message to database:', error);
      }
    } else {
      socket.emit('error', { message: 'Unauthorized: You are not a member of this project.' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from WebSocket server');
  });
});

const WS_PORT = 5001;
server.listen(WS_PORT, () => {
  console.log(`WebSocket server running on port ${WS_PORT}`);
});
