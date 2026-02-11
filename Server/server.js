import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import userDetails from './routes/userDetails.js';

config(); // Load environment variables FIRST

const app = express();

const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));  

//API endpoints
app.get('/', (req, res) => {
    res.json({
        message: "API Working",
        success: true
    })
});
app.use('/api/user', userRouter); 
app.use('/api/user-details', userDetails); 

//mongodb connection
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { console.log(`Server is running on PORT: 'http://localhost:${PORT}'`)});   