import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store/store';
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes"
import { ApolloProvider} from '@apollo/client';
import GraphQLClient from "./graphql/GraphQLConfig";

console.log("app env: " + process.env.REACT_APP_ENV);
console.log("api url: " + process.env.REACT_APP_API_URL);
console.log("graphql url: " + process.env.REACT_APP_GRAPHQL_URL);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <ApolloProvider client={GraphQLClient}>
        <AppRoutes/>
      </ApolloProvider>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
