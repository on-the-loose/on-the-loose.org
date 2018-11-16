import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { createConnection } from 'typeorm'
import { Request, Response } from 'express'
import { User } from './entity/User'

const port = 3000

// create and setup express app
createConnection().then(connection => {
  const app = express()
  app.use(express.static('dist'))

  app.use(bodyParser.json())

  // register routes
  app.get('/users', async function(req: Request, res: Response) {
    let users = await connection.manager.find(User)
    console.log(users)
  })

  app.get('/users/:id', function(req: Request, res: Response) {
    // here we will have logic to return user by id
  })

  app.post('/users', async function(req: Request, res: Response) {
    let user = new User()
    user.firstName = 'Test1'
    user.lastName = 'blblbl'

    await connection.manager.save(user)
  })

  app.put('/users/:id', function(req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
  })

  app.delete('/users/:id', function(req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../dist/index.html'))
  })

  app.listen(port, () => console.log(`> listening on port ${port}!`))
})
