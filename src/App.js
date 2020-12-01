import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Home from './Home';
import Protected from './Protected';

const oktaAuth = new OktaAuth({
  issuer: process.env.OIDC_ISSUER,
  clientId: process.env.OIDC_CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback'
});

const App = () => (
  <Router>
    <Security oktaAuth={oktaAuth}>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <SecureRoute path='/protected' component={Protected}/>
        <Route path='/login/callback' component={LoginCallback}/>
      </Switch>
    </Security>
  </Router>
);
 
export default App;
