import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from "dotenv"
import { AppDataSource } from './db'
import { notFoundResponse } from './utils'
import { AdminRoute } from './routes/admin.route'
import { DataRoute } from './routes/data.route'
import { TokenRoute } from './routes/token.route'

// Setting up web server
const app = express()
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

// Reading env variables
dotenv.config();
const port = process.env.SERVER_PORT;

// Connect to database
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch((error) => console.log(error))

app.use('/api/admin', AdminRoute)
app.use('/api/data', DataRoute)
app.use('/api/token', TokenRoute)

// Default not found page
app.get('*', function (req, res) {
    notFoundResponse(res)
});
