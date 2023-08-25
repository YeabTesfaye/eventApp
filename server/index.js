import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'
dotenv.config()
const PORT = process.env.PORT | 5000

const app = express()

app.use('/graphql', graphqlHTTP({
    schema : buildSchema(`

    type Event {
        _id : String
    }

     type RootQuery {
        events : [String!]!
     }

     type RootMuatation {
        createEvent(name:String) : String
     }
     schema  {
        query : RootQuery
        mutation : RootMuatation
     }
    `),
    rootValue : {
        events: () => {
            return ['Romantic ', 'Cooking', 'All-night Cooding']
        },
        createEvent : (args) => {
            const eventName = args.name 
            return eventName
        }
    },
    graphiql : true

}))

app.listen(PORT, () => {
    console.log(`The server is Listing at ${'http://localhost:5000/'.cyan.underline.bold}`);
})