# Template Overview

- web-server - [nextjs](https://nextjs.org/)
- configuration management - [convict](https://www.npmjs.com/package/convict)
- logger - [pino](https://github.com/pinojs/pino)
- http client - [fetch & react-query](https://react-query-v3.tanstack.com/)
- process management - [pm2](https://pm2.keymetrics.io/)
- code linter - [eslint](https://eslint.org/)
- code formatter - [prettier](https://prettier.io/)

# Start development server

1. yarn
2. yarn dev

# Sample route

http://localhost:3000/api/healthCheck

# launch file to debug

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "yarn dev",
      "env": { "APP_NODE_ENV": "development", "REGION": "in" }
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "yarn dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```
