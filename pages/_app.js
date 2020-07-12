import React from 'react';
import AuthState from '../contex/auth/authState';
import AppState from '../contex/app/appState';


const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <AppState>
        <Component {...pageProps}/>
      </AppState>
    </AuthState>
  )
}

export default MyApp;