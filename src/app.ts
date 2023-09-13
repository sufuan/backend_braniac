import express, { Application } from 'express'
const app:Application = express()

import cors from 'cors'


app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app