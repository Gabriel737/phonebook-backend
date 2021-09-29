import express, { json } from 'express'
import morgan, { token } from 'morgan'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(json())

token('object', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time :object'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.writeHead(200, {'Content-Type' : 'text/html'})
    .end(
      `<p>Phonebook has info for ${persons.length} people </p> ${String(Date())}`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  response.json(persons.filter(person => person.id === id))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'duplicate entry'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: parseInt(100000 * Math.random(), 10)
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})