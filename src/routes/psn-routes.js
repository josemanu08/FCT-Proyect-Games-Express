import { Router } from 'express'
/* eslint-disable */
import auth from '../keyInfo/authPsn.json' assert {type: 'json'}
/* eslint-enable */
import { uploadTokenAuth, getUserGamesFromId, getUserId, getUserDetails } from '../functions/tokenFunctions.js'

const router = Router()

router
  .use((req, res, next) => {
    next()
  })
  .get('/userGames&Achievements/:username', async (req, res) => {
    const updatedAuth = await uploadTokenAuth(auth)
    const id = await getUserId(updatedAuth, req.params.username)
    const data = await getUserGamesFromId(updatedAuth, id)
    res.json(data)
  })
  .get('/userDetails/:username', async (req,res) => {
    const updatedAuth = await uploadTokenAuth(auth)
    const details = await getUserDetails(updatedAuth, req.params.username)
    res.json(details)
  })

export { router }
