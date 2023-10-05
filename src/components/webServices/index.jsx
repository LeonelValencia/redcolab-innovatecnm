import * as Realm from "realm-web";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const app = new Realm.App(process.env.REACT_APP_SERVICE_KEY);
async function getValidAccessToken() {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshAccessToken();
  }
  return app.currentUser.accessToken;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/${process.env.REACT_APP_SERVICE_KEY}/graphql`,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

export default client
