import { getLogger } from '../../../logger'
const logger = getLogger('healthCheck')

export default async function handler(req, res) {
  console.log(global.name)
  logger.debug({ headers: req.headers }, 'Server side logging')
  return res.json({ success: true })
}
