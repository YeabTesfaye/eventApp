import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { connectDB } from "./config/db.js";
import { Event } from "./model/event.js";
dotenv.config();
const PORT = process.env.PORT || 5000; // Use logical OR operator

const app = express();
const events = [];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: async() => {
       return await Event.find({})
      },
      createEvent: async ({ eventInput }) => {
        const event = new Event({
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date(eventInput.date),
        });
      
        try {
          const savedEvent = await event.save();
          return savedEvent;
        } catch (error) {
          throw error;
        }
      },
      
    },
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(
    ` listening at ${`http://localhost:${PORT}/`.cyan.underline.bold}`
  );
  connectDB();
});
