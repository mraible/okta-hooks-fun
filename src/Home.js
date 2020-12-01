import {useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const login = async () => oktaAuth.signInWithRedirect('/');
  const logout = async () => oktaAuth.signOut('/');
  
  const [command, setCommand] = useState(null);

  useEffect(() => {
    async function getFavoriteAnimal() {
      const res = await fetch('/api/pre-reg?mode=profile-update&key=favoriteAnimal&value=Grizzly+Bear');
      const newCommand = await res.text();
      setCommand(newCommand);
    }
    getFavoriteAnimal();
  }, []);

  let body;

  if (authState.isPending) {
    body = <div>Loading...</div>
  }

  if (!authState.isAuthenticated) {
    body =
      <div>
        <p>Not Logged in yet</p>
        <button onClick={login}>Login</button>
      </div>
  } else {
    body = 
      <div>
        <p>Logged in! <Link to="/protected" className="App-link">View Protected</Link></p>
        <br />
        <h2>The Okta Hooks command is:</h2>
        <p>{command ? command : 'Loading command...'}</p>
        <button onClick={logout}>Logout</button>
      </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Home.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {body}
      </header>
    </div>
  );
};

export default Home;