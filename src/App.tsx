import { Authenticator } from '@aws-amplify/ui-react';
import {Amplify}  from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import ChatBot from './components/ChatBot/ChatBot.tsx';


Amplify.configure({
  Auth: {
    Cognito: {
      // userPoolId: 'eu-central-1_xaCLPHhTs',
      // userPoolClientId: '5plk66v79glgvfptci5mer5ne5',
      userPoolId: 'eu-central-1_joZmlVOgL',
      userPoolClientId: '1t3emt23vbu3url3n70ts318sg',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
  API: {
    REST: {
      'baiterek-ve-prod-eu-api': {
        endpoint: 'https://q99c0m4p4e.execute-api.eu-central-1.amazonaws.com/prod',
        region: 'eu-central-1',
      }
    }
  }
});


export default function App() {
  return (
  
    <Authenticator>
      {({user,  signOut }) => (
        
        <BrowserRouter>
          <Routes>
            <Route 
              
              path="/chatbot" 
              element={
                <div>
                  <ChatBot user={user} signOut={signOut} />
                </div>
              } 
            />
            <Route path="*" element={<Navigate to="/chatbot" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </Authenticator>
  );
}
