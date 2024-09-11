import pino from 'pino'
const logLevel = process.env.logLevel
const pinoInstance = pino({
  name: 'template-nextjs-logger',
  level: logLevel
})
export function getLogger(name) {
  return pinoInstance.child({ name, level: logLevel })
}
