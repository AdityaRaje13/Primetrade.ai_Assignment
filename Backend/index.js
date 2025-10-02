import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Connection } from './Database/db.js';
import userRoutes from './routes/user.routes.js';
import noteRoutes from './routes/note.routes.js';

const app = express();

Connection();

// Important Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// cors policy
app.use(cors({
    origin : '*',
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true,
}))

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/notes', noteRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Authentication API is running!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running - http://localhost:${PORT}`);
});

export default app;