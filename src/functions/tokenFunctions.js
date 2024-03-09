import { 
  exchangeRefreshTokenForAuthTokens,
  getProfileFromUserName,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  makeUniversalSearch,
  getTitleTrophies,
  getTitleTrophyGroups
} from 'psn-api'
import fs from 'node:fs/promises'
import expDate from '../keyInfo/expDate.json' assert {type: 'json'}

export const uploadTokenAuth = async (token) => {
  if (new Date().getTime() > expDate.expDate) {
    const newAuth = await exchangeRefreshTokenForAuthTokens(token.refreshToken)

    await fs.writeFile('src\\keyInfo\\expDate.json',
    JSON.stringify({ expDate: new Date().getTime() + (newAuth.expiresIn * 1000) }))

    await fs.writeFile('src\\keyInfo\\authPsn.json', JSON.stringify(newAuth))

    return newAuth
  } else {
    console.log('Por ahora va bien la cosa')
    return token
  }
}

export const getUserId = async (auth, username) => {
  return ((await getProfileFromUserName(auth, username)).profile.accountId)
}

export const getUserGamesFromId = async (auth, userId) => {
  return await getUserTitles(auth, userId)
}

export const getUserDetails = async (auth, username) => {
  return await getProfileFromUserName(auth, username)
}

export const makeSearch = async (auth, username) => {
  return await makeUniversalSearch(auth, username, 'SocialAllAccounts')
}

export const getTrophyDetails = async (auth, accountId, titleId) => {
  return getUserTrophiesEarnedForTitle(auth, accountId, titleId, 'all', { npServiceName: "trophy" })
}

export const getAllTrophies = async (auth, gameId) => {
  return await getTitleTrophies(
    auth,
    gameId,
    'all',
    { npServiceName: "trophy" }
    )
}

export const getTrophyGroups = async (auth, gameId) => {
  return await getTitleTrophyGroups(auth, gameId, {npServiceName: "trophy"})
}