import express from 'express';
import dotenv from 'dotenv';  // Corrected dotenv import
import { router } from './routes/todos.routes.js';  // Import routes after it's defined
import cors from 'cors'

dotenv.config(); // Load environment variables
export const todos=[];

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
// Middleware to parse JSON bodies
app.use(express.json());

// Use routes for handling todos
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
