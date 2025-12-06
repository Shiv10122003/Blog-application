import express from 'express';
import dotenv from  'dotenv';
import connectDB from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoutes);
app.use('/api/blog',blogRoutes)
connectDB();


const PORT =  process.env.PORT|| 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});