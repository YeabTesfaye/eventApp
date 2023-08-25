import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

dotenv.config();
const PORT = process.env.PORT || 5000; // Use logical OR operator

const app = express();
const events = [];

app.use(
  '/graphql',
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
      events: () => {
        return events; // Return the actual events array
      },
      createEvent: ({ eventInput }) => {
        const event = {
          _id: Math.random().toString(), // Correct the method call
          title: eventInput.title, // Destructure the eventInput
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date().toISOString(),
        };
        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`The server is listening at ${`http://localhost:${PORT}/`.cyan.underline.bold}`);
});
