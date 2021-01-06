import express from 'express'

const app = express()
app.listen(3003, () => {
  console.info('Server running at http://localhost:3003')
})
