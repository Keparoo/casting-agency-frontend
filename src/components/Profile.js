import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CastingAgencyApi from '../api/api';

const Profile = () => {
  console.debug('Profile')
  
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [ actors, setActors ] = useState([]);
  const [token, setToken] = useState(null)

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "websecure.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        // setToken(accessToken)
        // CastingAgencyApi.token = token
        // const res = await CastingAgencyApi.getActors();
        // console.debug('Actors Res:', res);
        // setActors(res);
        // console.debug(actors)
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);

      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        <p>{token}</p>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;
