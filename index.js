import express, { json } from 'express'
import morgan, { token } from 'morgan'
import { Contact } from './models/contact.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(json())

token('object', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time :object'))

app.get('/info', (request, response) => {
  Contact.count({}, (error, count) => {
    response.writeHead(200, { 'Content-Type' : 'text/html' })
      .end(
        `<p>Phonebook has info for ${count} people </p> ${String(Date())}`
      )
  })
})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contact => {
    response.json(contact)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id).then(contact => {
    if(contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then( () => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

// Handler of requests with unknown endpoint
app.use((request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
})

// Handler of requests with result to errors
app.use((error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})