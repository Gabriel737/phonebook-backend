import mongoose from 'mongoose'
import dotenv from 'dotenv'
import uniqueValidator from 'mongoose-unique-validator'

dotenv.config()
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then( () => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.log('Error: ', error.message)
  })

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    unique: true,
    required: true
  },
  number: {
    type: String,
    minLength: 3,
    required: true
  }
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

phoneBookSchema.plugin(uniqueValidator)

export const Contact = mongoose.model('Contact', phoneBookSchema)