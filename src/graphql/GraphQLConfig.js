import { ApolloClient, createHttpLink, InMemoryCache, split} from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Auth from '../components/auth/auth';

// var bearerToken = process.env.REACT_APP_API_TOKEN

var hasuraWebSocketUrl = process.env.REACT_APP_GRAPHQL_WEBSOCKET_URL

var bearerToken = Auth.getAuthToken()

bearerToken = (bearerToken) ? bearerToken : ""

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  headers: {
    Authorization: `Bearer ${bearerToken}`
  },

});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: hasuraWebSocketUrl,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    }
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const GraphQLClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

export default GraphQLClient