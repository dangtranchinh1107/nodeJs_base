import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from './routers/index';

dotenv.config();
const { PORT, DB_URI } = process.env;
// Kết nối DB
mongoose.connect(`${DB_URI}`).then(() => {
    console.log("Database connected");
})

const app = express();
app.use(express.json());

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})