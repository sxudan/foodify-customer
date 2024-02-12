import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {RetryLink} from '@apollo/client/link/retry';
import Config from 'react-native-config';
import {LOGOUT} from './screens/auth/store/authTypes';
import store from './store';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import apolloLogger from 'apollo-link-logger';

const httpLink = createHttpLink({
  uri: Config.API_URL,
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from redux store if it exists

  const {
    auth: {authToken},
  } = store.getState();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    // graphQLErrors.forEach(console.log);
  }

  if (
    graphQLErrors &&
    graphQLErrors.length > 0 &&
    (graphQLErrors[0].message.toLowerCase() === 'unauthorized' ||
      graphQLErrors[0].message.toLowerCase() === 'unauthorised')
  ) {
    if (graphQLErrors[0].message[0] !== 'me') {
      console.debug('API authentication error, logging out user');

      store.dispatch({
        type: LOGOUT,
        payload: null,
      });
    }
  }

  if (networkError) {
    console.error('Network error occurred', {networkError});
  }
});

const retryLink = new RetryLink();

const cache = new InMemoryCache({
  // If your graphql schema uses interface or union types, uncomment the line below and import the default export
  // from generated.ts as `introspectionResult`.
  // If your graphql schema will not be using interface or union types, you can safely delete this line.
  //
  // possibleTypes: introspectionResult.possibleTypes,
});

let links: ApolloLink;
if (__DEV__) {
  // httpLink must be last
  links = ApolloLink.from([
    errorLink,
    retryLink,
    authLink,
    // apolloLogger,
    httpLink,
  ]);
} else {
  links = ApolloLink.from([errorLink, retryLink, authLink, httpLink]);
}

const client = new ApolloClient({
  link: links,
  cache: cache,
  connectToDevTools: true,
});

export default client;
