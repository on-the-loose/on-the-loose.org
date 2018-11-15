import express from 'express'
import path from 'path'

const app = express()
const port = 3000

app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'))
})

app.listen(port, () => console.log(`> listening on port ${port}!`))
