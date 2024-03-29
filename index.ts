import express, { Express } from 'express'
import dotenv from 'dotenv'
import routes from './routes/routes'

dotenv.config()

export const app: Express = express()
const port = process.env.PORT
const credentials = process.env.CREDENTIALS
const { google } = require('googleapis')
const mongoose = require('mongoose')
const cors = require('cors');

const oauth2Client = new google.auth.OAuth2(credentials)

google.options({ auth: oauth2Client })


app.use(cors({
    origin: ['https://frontend-v2-nu-fawn.vercel.app', 'http://localhost:3000/']
}));
app.use(express.json())
app.use('/', routes)

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((error: Error) => {
    console.log(error)
  })

export const dummyData: Object = {
  kind: 'calendar#freeBusy',
  timeMin: '2023-04-30T16:00:00.000Z',
  timeMax: '2023-05-31T15:59:59.000Z',
  calendars: {
    primary: {
      busy: [
        {
          start: '2023-05-01T11:30:00+08:00',
          end: '2023-05-01T12:30:00+08:00',
        },
        {
          start: '2023-05-01T17:30:00+08:00',
          end: '2023-05-01T19:30:00+08:00',
        },
        {
          start: '2023-05-01T23:00:00+08:00',
          end: '2023-05-02T00:00:00+08:00',
        },
        {
          start: '2023-05-02T17:00:00+08:00',
          end: '2023-05-02T18:30:00+08:00',
        },
        {
          start: '2023-05-04T19:00:00+08:00',
          end: '2023-05-04T20:00:00+08:00',
        },
        {
          start: '2023-05-06T10:00:00+08:00',
          end: '2023-05-06T11:30:00+08:00',
        },
        {
          start: '2023-05-07T10:00:00+08:00',
          end: '2023-05-07T12:00:00+08:00',
        },
        {
          start: '2023-05-07T14:00:00+08:00',
          end: '2023-05-07T18:00:00+08:00',
        },
        {
          start: '2023-05-08T19:00:00+08:00',
          end: '2023-05-08T20:30:00+08:00',
        },
        {
          start: '2023-05-08T21:00:00+08:00',
          end: '2023-05-08T22:00:00+08:00',
        },
        {
          start: '2023-05-08T23:00:00+08:00',
          end: '2023-05-09T00:00:00+08:00',
        },
        {
          start: '2023-05-09T14:30:00+08:00',
          end: '2023-05-09T15:00:00+08:00',
        },
        {
          start: '2023-05-09T20:00:00+08:00',
          end: '2023-05-09T21:00:00+08:00',
        },
        {
          start: '2023-05-10T19:00:00+08:00',
          end: '2023-05-10T20:30:00+08:00',
        },
        {
          start: '2023-05-11T19:00:00+08:00',
          end: '2023-05-11T20:00:00+08:00',
        },
        {
          start: '2023-05-11T20:30:00+08:00',
          end: '2023-05-11T21:30:00+08:00',
        },
        {
          start: '2023-05-12T21:30:00+08:00',
          end: '2023-05-12T23:30:00+08:00',
        },
        {
          start: '2023-05-13T12:00:00+08:00',
          end: '2023-05-13T16:00:00+08:00',
        },
        {
          start: '2023-05-14T10:00:00+08:00',
          end: '2023-05-14T12:00:00+08:00',
        },
        {
          start: '2023-05-14T14:00:00+08:00',
          end: '2023-05-14T18:00:00+08:00',
        },
        {
          start: '2023-05-16T17:00:00+08:00',
          end: '2023-05-16T18:30:00+08:00',
        },
        {
          start: '2023-05-17T19:00:00+08:00',
          end: '2023-05-17T22:30:00+08:00',
        },
        {
          start: '2023-05-17T23:00:00+08:00',
          end: '2023-05-17T23:30:00+08:00',
        },
        {
          start: '2023-05-18T19:00:00+08:00',
          end: '2023-05-18T22:30:00+08:00',
        },
        {
          start: '2023-05-19T19:30:00+08:00',
          end: '2023-05-19T20:30:00+08:00',
        },
        {
          start: '2023-05-20T21:30:00+08:00',
          end: '2023-05-21T00:00:00+08:00',
        },
        {
          start: '2023-05-21T12:00:00+08:00',
          end: '2023-05-21T15:00:00+08:00',
        },
        {
          start: '2023-05-23T17:00:00+08:00',
          end: '2023-05-23T18:30:00+08:00',
        },
        {
          start: '2023-05-23T20:00:00+08:00',
          end: '2023-05-23T21:00:00+08:00',
        },
        {
          start: '2023-05-24T19:00:00+08:00',
          end: '2023-05-24T20:30:00+08:00',
        },
        {
          start: '2023-05-24T22:00:00+08:00',
          end: '2023-05-25T00:00:00+08:00',
        },
        {
          start: '2023-05-25T19:00:00+08:00',
          end: '2023-05-25T20:00:00+08:00',
        },
        {
          start: '2023-05-26T21:00:00+08:00',
          end: '2023-05-27T00:00:00+08:00',
        },
        {
          start: '2023-05-28T10:00:00+08:00',
          end: '2023-05-28T12:00:00+08:00',
        },
        {
          start: '2023-05-28T14:00:00+08:00',
          end: '2023-05-28T18:00:00+08:00',
        },
        {
          start: '2023-05-30T18:00:00+08:00',
          end: '2023-05-30T19:00:00+08:00',
        },
      ],
    },
  },
}
