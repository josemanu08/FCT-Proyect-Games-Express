import { exchangeNpssoForCode, exchangeCodeForAccessToken } from 'psn-api'
// import authorization from './authPsn.json' assert {type:'json'};
import fs from 'fs/promises'

const npsso = 'Ir3XOzipTPINmorrDP16bvdXnTQem6bwaRFMIWd3wEF2Lql8MHUSsjtD27Gy5Kyo'

const code = await exchangeNpssoForCode(npsso)
const authorization = await exchangeCodeForAccessToken(code)

await fs.writeFile('Test01\\src\\scripts\\authPsn.json', JSON.stringify(authorization))

await fs.writeFile('Test01\\src\\scripts\\expirationDate.json',
  JSON.stringify({ expDate: new Date().getTime() + (authorization.expiresIn * 1000) }))
