import 'dotenv/config'
import app from './config/app'
import env from './config/env'

app.listen(env.port, () => {
  console.info(`Server running at http://localhost:${env.port}`)
})
