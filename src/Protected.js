import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Protected = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then(info => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  return (
    <div className="App">
      {userInfo && (
        <div className="App-header">
          <p>Welcome back, {userInfo.name}!</p>
          <table>
            <thead>
              <tr>
                <th>Claim</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(userInfo).map((claimEntry) => {
                const claimName = claimEntry[0];
                const claimValue = claimEntry[1];
                const claimId = `claim-${claimName}`;
                return (
                  <tr key={claimName}>
                    <td>{claimName}</td>
                    <td id={claimId}>{claimValue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to="/" className="App-link">Home</Link>
        </div>
      )}
    </div>
  );
};

export default Protected;