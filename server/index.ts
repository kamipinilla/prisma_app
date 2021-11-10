import express from 'express'
import path from 'path'
import api from './routes/api'
import env from 'dotenv'

env.config()

const app = express()

const clientFolder = '../client'
const clientPath = path.join(__dirname, clientFolder)
const buildPath = path.join(clientPath, 'build')

app.use(express.static(buildPath))
app.use(express.json())
app.use('/api', api)

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Listening on port ${port}`)