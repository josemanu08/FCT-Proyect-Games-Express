import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { router } from './src/routes/psn-routes.js'

config({
  path: './.env'
})

const App = express()
App.use(cookieParser())
App.use(express.json())
App.use(express.text())
App.use(express.urlencoded())

App.use('/psn-api', router)

App.listen(process.env.PORT ?? '8000', () => {
  console.log('listening...')
})
