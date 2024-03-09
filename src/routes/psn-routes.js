import { Router } from 'express'
/* eslint-disable */
import auth from '../keyInfo/authPsn.json' assert {type: 'json'}
/* eslint-enable */
import { 
  uploadTokenAuth,
  getUserGamesFromId,
  getUserId,
  getUserDetails,
  getTrophyDetails,
  getAllTrophies,
  getTrophyGroups
} from '../functions/tokenFunctions.js'

const router = Router()

router
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
  .get('/getUserId/:username', async (req, res) => {
    const updatedAuth = await uploadTokenAuth(auth)
    const userId = await getUserId(updatedAuth, req.params.username)
    // const userId = await makeSearch(auth, req.params.username)
    res.send(userId)
  })
  // Devuleve los trofeos del usuario según un juego
  .get('/trophyDetails', async (req, res) => {
    const updatedAuth = await uploadTokenAuth(auth)
    const {userId, titleId} = req.query
    const tDetails = await getTrophyDetails(updatedAuth, userId, titleId)
    res.json({tDetails})
  })
  //Devuelve todos los trofeos del videojuego
  .get('/allTrophies/:trophieId', async (req, res) => {
    const updatedAuth = await uploadTokenAuth(auth)
    const allTrophies = await getAllTrophies(updatedAuth, req.params.trophieId)
    res.send(allTrophies)
  })
  .get('/allTrophyGroups/:trophieId', async(req, res) => {
    const updatedAuth = await uploadTokenAuth(auth)
    const trophyGroups = await getTrophyGroups(updatedAuth, req.params.trophieId)
    res.send(trophyGroups)
  })

export { router }
