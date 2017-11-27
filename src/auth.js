import auth0 from 'auth0-js'
import history from './history'
export default function () {
  const auth= new auth0.WebAuth({
domain:  'jrscode1.auth0.com',
clientID: 'from Auth0',
redirectUri:'http://localhost:3000/callback',
audience: 'https://api.notifly.com',
responseType:  'token id_token',
scope: 'openid admin'
  })

return {
  login,
  logout,
  isAuthenticated,
  handleAuthentication}

  function handleAuthentication(){


  }
}

function isAuthenticated (){
'from Auth0'

}
function login() {
  auth.authorize()
}
  function logout() {
    'from Auth0'
  }
}
