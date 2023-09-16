import express, { Application } from 'express'
const app: Application = express()
import userRoute from './app/module/user/user.route'

import cors from 'cors'
import bodyParser from 'body-parser'

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api/v1/users/', userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
